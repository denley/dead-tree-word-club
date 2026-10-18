#!/bin/sh
# Lists every cover in client/public/covers in client/src/data/covers.json: its size (so the
# page can lay it out before it loads) and its average colour (the glow behind it).
# Run after adding or replacing a cover. Needs ImageMagick 7 (`magick`).
set -eu
cd "$(dirname "$0")/.."
out=client/src/data/covers.json
{
  echo "{"
  first=1
  for f in client/public/covers/*.jpg; do
    slug=$(basename "$f" .jpg)
    info=$(magick "$f" -format '%w %h ' -write info: -resize '1x1!' -format '%[hex:u.p{0,0}]' info:)
    set -- $info
    [ $first = 1 ] || echo ","
    first=0
    printf '  "%s": { "width": %s, "height": %s, "tint": "#%s" }' "$slug" "$1" "$2" "$(echo "$3" | cut -c1-6 | tr 'A-F' 'a-f')"
  done
  echo
  echo "}"
} > "$out"
echo "wrote $out ($(grep -c tint "$out") covers)"
