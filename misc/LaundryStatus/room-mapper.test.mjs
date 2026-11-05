import test from 'node:test';
import assert from 'node:assert/strict';
import {extractRoomMappings} from './room-mapper.mjs';

test('maps a dashboard export',()=>{
  const found=extractRoomMappings({rooms:[{id:'5730',name:'Kimball Hall',location:'Residence Halls'}]});
  assert.equal(found.length,1);assert.equal(found[0].location,'Residence Halls');
});
test('maps a machine roster without treating machine IDs as room IDs',()=>{
  const found=extractRoomMappings([{id:'210883',room:{id:'7907',roomName:'Warwick: Tocil'},organization:{organizationName:'University of Warwick'}}]);
  assert.equal(found.length,1);assert.equal(found[0].id,'7907');
  assert.equal(found[0].organization,'University of Warwick');
});
test('maps a nested geo-boundary tree',()=>{
  const found=extractRoomMappings({id:'1',name:'Campus',geoBoundaries:[{id:'2',name:'North Hall',rooms:[{id:'1234',roomName:'Laundry 1'}]}]});
  assert.equal(found[0].location,'North Hall');
});
test('joins JSON:API room and geo-boundary',()=>{
  const found=extractRoomMappings({data:{type:'rooms',id:'4321',attributes:{roomName:'South'},relationships:{geoBoundary:{data:{id:'800',type:'geo-boundaries'}}}},included:[{type:'geo-boundaries',id:'800',attributes:{name:'South Residence'}}]});
  assert.equal(found[0].location,'South Residence');
});
test('ignores machine IDs',()=>assert.deepEqual(extractRoomMappings({id:'129',machineName:'Washer'}),[]));
