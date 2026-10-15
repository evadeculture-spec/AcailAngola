#!/usr/bin/env bash
# Gera assets, PPTX, PDF e pré-visualizações.
set -euo pipefail
cd "$(dirname "$0")"
SK=${PPTX_SKILL:-/root/.claude/skills/synced/6e48c676-3ca1-419b-9492-5051d8189a86_57a953ec-cacf-4ded-b80d-2f4f025f0a63/pptx}
[ "${SKIP_ASSETS:-0}" = 1 ] || { node src/render-assets.js && node -e "const s=require('sharp');(async()=>{for(const f of ['cover','plant-raw','steel','cylinders','pipes','pipes-dark','mock-angola','mock-gas','mock-pref'])await s('assets/'+f+'.png').jpeg({quality:88,mozjpeg:true}).toFile('assets/'+f+'.jpg')})()"; }
NODE_PATH=$PWD/node_modules node src/build.js
python3 "$SK/scripts/office/validate.py" dist/*.pptx
(cd dist && python3 "$SK/scripts/office/soffice.py" --headless --convert-to pdf *.pptx >/dev/null)
rm -rf dist/render && mkdir -p dist/render && pdftoppm -jpeg -r 80 dist/*.pdf dist/render/s
python3 -c "
from PIL import Image;import glob
fs=sorted(glob.glob('dist/render/s-*.jpg'))
for k in range(0,len(fs),4):
  ims=[Image.open(f) for f in fs[k:k+4]];w,h=ims[0].size
  m=Image.new('RGB',(w*2+10,h*2+10),'white')
  for i,im in enumerate(ims): m.paste(im,((i%2)*(w+10),(i//2)*(h+10)))
  m.save(f'dist/render/m{k//4+1}.jpg',quality=85)"
