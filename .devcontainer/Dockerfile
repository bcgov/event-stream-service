ARG VARIANT="20.18.3-bookworm"

#
# Build the nats nk tool
# For devcontainers, we build natively (no cross-compilation needed)
#
FROM golang:alpine AS nk_tool

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
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install nk tool binary
COPY --from=nk_tool /go/bin /usr/local/bin

