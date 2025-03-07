ARG VARIANT="20.18.2-bookworm"

#
# need the nats tk tool
#
FROM golang:alpine as nk_tool

# need to install nats nk tool
RUN apk update && apk upgrade -a \
    && go install github.com/nats-io/nkeys/nk@latest

#
# build our development image
#
FROM node:${VARIANT}

# Install some extras such as vim for interactive rebases.
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
        vim \
        xauth \
        xvfb \
    && apt-get clean

# Install nk tool binary
COPY --from=nk_tool /go/bin /usr/local/bin

