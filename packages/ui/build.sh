#!/usr/bin/env bash

set -e

IMAGE_NAME=frntnd_ui_storybook


version() {
  BRANCH=$(git branch --show-current)
  DATE=$(git show -s --format="%ad" --date="format:%Y%m%d_%H%M%S")
  AUTHOR=$(git show -s --format="%ae")  # %al in newer versions
  AUTHOR=${AUTHOR/@*} # erase e-mail domain
  echo "$DATE.$BRANCH.$AUTHOR"
}

build_app() {
    npm ci
    npm run build:storybook
}

build_image() {
    docker build -t $REGISTRY/$IMAGE_NAME -t $REGISTRY/$IMAGE_NAME:$(version) .
}

build_app
build_image
