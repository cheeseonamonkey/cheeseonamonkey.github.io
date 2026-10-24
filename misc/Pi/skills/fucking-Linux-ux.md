---
name: fucking-ux-laws
description: Opinionated UX rules for Linux CLIs, TUIs, scripts, and developer tools. Apply when developing them.
---

# Incredibly stupid fucking laws of UX

- these are defaults, not commandments; preserve compatibility and composability when they conflict
- humor & irony are intentionally used to best demonstrate common frustrations & failures


1. **CTRL+C means exit! Spamming CTRL+C 30 times per second should exit any fucking TUI immediately.**
   - first interrupt cancels; repeated interrupts exit promptly
   - restore terminal state and preserve recoverable work

2. **Usage should be simple enough to use when I'm considerably high or drunk.**
   - make primary actions discoverable without documentation
   - consider cognitive load & attention drain 

3. **Tab completions/suggestions. Don't make me set them up myself; implement them in the CLI itself.**
   - generate shell completions for commands, flags, and relevant values; no separate zsh plugin required

4. **TUIs are fucking lit.**
   - optional Vim bindings: `j/k`, `/`, `n`, `?`; keep arrow keys functional
   - `Esc` backs out; `q` quits; document shortcuts in-context
   - keyboard-first; restore terminal modes on exit

5. **`-p` is port. `-P` is something else.**
   - consistent flags across related commands; preserve established compatibility

6. **If something is going to take more than 5 seconds, tell me what the fuck you're doing as you do it.**
   - report progress on interactive `stderr`; keep piped `stdout` clean
   - support cancellation; respect quiet and noninteractive modes

7. **`-h` means `--help`. If you choose not to alias `-h` as `--help`, and you aren't even using it for anything else, you are going straight to hell.**
   - exceptions: legacy commands; human-readable sizes (`ls -lh`)

8. **`--help` should be progressive, and should occupy at most 1 terminal buffer without scrolling.**
   - show common usage and examples first; put exhaustive detail in subcommand help or man pages
   - group related options and avoid duplicate alias entries

9. **Not everything needs to be a goddamn service. Some things should just do their job and then exit gracefully. Revolutionary stuff, I know.**
   - prefer one-shot execution when persistence is unnecessary
   - require privileges and dependencies only when justified

10. **Do not clear my fucking terminal buffer. I was looking at that.**
    - preserve scrollback and failure context
    - respect `TERM`, `NO_COLOR`, terminal width, and TTY detection

---

- ux is designed first, tested often, and polished last 
- agents are bad at UX for humans; test real human workflows, not just successful automation
- bad UX is often more visible and frustrating than performance problems
- ASK THE USER when unsure; infer only what is safe and unambiguous
- don't let UX contradict itself; consistent keys, flags, terminology, and behavior
- UX helps control drift; clear constraints, predictable behavior, visible state
- make the main run obvious; avoid flag soup, use subcommands for distinct main modes
- mandatory inputs should generally be positional, not dashed flags
- abstract options and flags; sensible defaults, presets, progressive disclosure
- consider carefully what belongs in CLI options versus configuration
- flags and options override config values
- follow established conventions (`-o`, `-v`, `-h`, etc.); respect compatibility
- limit cognitive load; minimize decisions and memorization
- make common paths easy without hiding advanced capabilities
- errors, cancellation, setup, and exit are UX too
- test real workflows, including narrow terminals, pipes, failures, and first use
