#!/bin/bash
set -ex

# Convenience workspace directory for later use
WORKSPACE_DIR=$(pwd)
LOCALHOST_DIR=${WORKSPACE_DIR}/.devcontainer/localhost


 # install app libraries, prepare for app development and debugging...
cd $WORKSPACE_DIR/app
npm install

# install frontend libraries, prepare for ux development and debugging...
cd $WORKSPACE_DIR/frontend
npm install && npm run build

# service examples
cd $WORKSPACE_DIR/service
npm install

# copy over the sample files to the image...
cp -u ${LOCALHOST_DIR}/local.sample.json ${LOCALHOST_DIR}/local.json

# if and when a db is added to our localhost docker-compose environmen
# fire up postgres... we want to seed the db
# docker compose -f ${LOCALHOST_DIR}/docker-compose.yml up --wait

# you need this to connect to the running postgres instance.
# run an initial migration for the db and seed it...
# export NODE_CONFIG_DIR=${LOCALHOST_DIR} 
