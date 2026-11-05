// Extract only room identifiers and location metadata from Alliance JSON exports.
const text = value => String(value ?? '').trim();
const object = value => value && typeof value === 'object' ? value : {};
const attributes = node => object(node.attributes ?? node);
const validId = id => /^\d{1,12}$/.test(String(id ?? ''));
const children = ['room','rooms','geoBoundary','geoBoundaries','included','data','customerGeoBoundaries','locations'];

function boundaryRef(node) {
  const relation = node.relationships?.geoBoundary?.data ?? node.geoBoundary;
  return String(relation?.id ?? relation?.data?.id ?? node.geoBoundaryId ?? '');
}

export function extractRoomMappings(payload) {
  const boundaries = new Map(), results = new Map();
  const seen = new WeakSet();

  function index(node, depth=0) {
    if (!node || typeof node !== 'object' || depth>18 || seen.has(node)) return;
    seen.add(node);
    if (Array.isArray(node)) { for (const child of node) index(child,depth+1); return; }
    const a=attributes(node);
    if (node.type==='geo-boundaries' || node.geoBoundaries || node.rooms) {
      const name=text(a.geoBoundaryName || a.description || a.name);
      if (node.id!=null && name) boundaries.set(String(node.id),name);
    }
    for (const key of children) if (node[key]) index(node[key],depth+1);
  }

  function visit(node, ctx={}, kind='', depth=0) {
    if (!node || depth>18 || results.size>=500) return;
    if (Array.isArray(node)) { for (const child of node) visit(child,ctx,kind,depth+1); return; }
    if (typeof node!=='object') return;
    const a=attributes(node);
    const isBoundary=node.type==='geo-boundaries' || kind==='geoBoundaries' || kind==='geoBoundary';
    const location=isBoundary ? text(a.geoBoundaryName || a.description || a.name)||ctx.location||'' : ctx.location||'';
    const organization=text(a.organizationName || node.organization?.organizationName)||ctx.organization||'';
    const next={location,organization,city:text(a.city)||ctx.city||'',state:text(a.state)||ctx.state||'',country:text(a.country)||ctx.country||''};
    if ((node.type==='rooms' || kind==='rooms' || kind==='room' || a.roomName) && validId(node.id)) {
      const id=String(node.id);
      const item={id,name:text(a.roomName || a.name)||'Room '+id,
        location:text(a.location || a.locationName || a.geoBoundaryName)||boundaries.get(boundaryRef(node))||location,
        organization,city:next.city,state:next.state,country:next.country};
      const old=results.get(id);
      if (!old || Object.values(item).join('').length>Object.values(old).join('').length) results.set(id,item);
    }
    for (const key of children) if (node[key]) visit(node[key],next,key,depth+1);
  }
  index(payload);
  visit(payload);
  return [...results.values()];
}
