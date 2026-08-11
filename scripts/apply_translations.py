#!/usr/bin/env python3
"""Apply an ES->EN translation dictionary to user-facing fields of an
OpenAPI YAML, preserving the file's structure/quoting.

Handles three value shapes:
  - single-line:   description: Texto
  - double-quoted multi-line
  - block scalars: description: |- / | / >- / >
"""
import json
import re
import sys

TRANS = json.load(open('/tmp/translations.json'))
# Field key must NOT be preceded by a quote (avoids matching JSON keys like
# "description": inside embedded examples).
FIELD = re.compile(r'^(\s*)(?<!["\'])(summary|description|title):(\s*)(.*)$')


def lookup(text):
    return TRANS.get(text.strip())


def requote(original_first_line, translated):
    """Match the quoting style of the original value."""
    s = original_first_line.strip()
    if s.startswith('"'):
        return '"' + translated.replace('"', '\\"') + '"'
    if s.startswith("'"):
        return "'" + translated + "'"
    return translated


def main(path):
    lines = open(path).readlines()
    out = []
    i = 0
    replaced = 0
    while i < len(lines):
        line = lines[i]
        m = FIELD.match(line.rstrip('\n'))
        if not m:
            out.append(line)
            i += 1
            continue
        indent, field, space, value = m.groups()
        v = value.strip()

        # --- block scalar ---
        if v in ('|-', '|', '>-', '>'):
            buf = []
            j = i + 1
            base = len(indent)
            while j < len(lines):
                ln = lines[j]
                stripped = ln.strip()
                nindent = len(ln) - len(ln.lstrip())
                if stripped == '' or nindent > base:
                    buf.append(ln)
                    j += 1
                else:
                    break
            full = ' '.join(b.strip() for b in buf).strip()
            t = lookup(full)
            if t:
                out.append(f"{indent}{field}:{space}{v}\n")
                # re-emit block content preserving relative indentation
                bindent = ' ' * (base + 2)
                out.append(f"{bindent}{t}\n")
                replaced += 1
                i = j
                continue
            out.append(line)
            out.extend(buf)
            i = j
            continue

        # --- double-quoted multi-line ---
        if v.startswith('"') and not (v.endswith('"') and len(v) > 1):
            raw = [line]               # original lines, indentation intact
            buf = [v]
            j = i + 1
            while j < len(lines):
                raw.append(lines[j])
                buf.append(lines[j].strip())
                if lines[j].strip().endswith('"'):
                    break
                j += 1
            full = ' '.join(buf).strip().strip('"')
            t = lookup(full)
            if t:
                out.append(f"{indent}{field}:{space}\"{t.replace(chr(34), chr(92)+chr(34))}\"\n")
                replaced += 1
            else:
                out.extend(raw)         # keep original lines untouched
            i = j + 1
            continue

        # --- single line ---
        key = v.strip('"').strip("'")
        t = lookup(key)
        if t:
            out.append(f"{indent}{field}:{space}{requote(v, t)}\n")
            replaced += 1
        else:
            out.append(line)
        i += 1

    open(path, 'w').writelines(out)
    print(f"replaced: {replaced}")


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'src/assets/apis/core/en.yaml')
