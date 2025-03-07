#!/bin/bash
set -ex

# Convenience workspace directory for later use
WORKSPACE_DIR=$(pwd)

 # install app libraries, prepare for app development and debugging...
cd $WORKSPACE_DIR/app
npm install

# install frontend libraries, prepare for ux development and debugging...
cd $WORKSPACE_DIR/frontend
npm install && npm run build


