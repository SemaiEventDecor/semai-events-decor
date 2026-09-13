#!/usr/bin/env bash
# Saves the photos currently on your Lovable site into ./assets
# Run once from the project folder:  bash download-assets.sh
set -euo pipefail

curl -fL --create-dirs -o "assets/hero.jpg" "https://semaieventsdecor.lovable.app/__l5e/assets-v1/5c01aa2e-61d4-41f7-9724-620efdf21cb2/hero.jpg"
curl -fL --create-dirs -o "assets/about-studio.jpg" "https://semaieventsdecor.lovable.app/assets/about-studio-kHiAcxfi.jpg"
curl -fL --create-dirs -o "assets/service-birthday.jpg" "https://semaieventsdecor.lovable.app/assets/service-birthday-DWhHZ_2a.jpg"
curl -fL --create-dirs -o "assets/service-bridal.jpg" "https://semaieventsdecor.lovable.app/assets/service-bridal-CkYIw01B.jpg"
curl -fL --create-dirs -o "assets/service-baby.jpg" "https://semaieventsdecor.lovable.app/assets/service-baby-DbaqTa8D.jpg"
curl -fL --create-dirs -o "assets/service-engagement.jpg" "https://semaieventsdecor.lovable.app/assets/service-engagement-7bYrcUMP.jpg"
curl -fL --create-dirs -o "assets/service-wedding.jpg" "https://semaieventsdecor.lovable.app/assets/service-wedding-CmBSC-r2.jpg"
curl -fL --create-dirs -o "assets/service-corporate.jpg" "https://semaieventsdecor.lovable.app/assets/service-corporate-DFJ-w3Fn.jpg"
curl -fL --create-dirs -o "assets/service-custom.jpg" "https://semaieventsdecor.lovable.app/assets/service-custom-Btgn97VC.jpg"

echo 'Done. Photos are in ./assets'
