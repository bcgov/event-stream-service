# TOOLS

## pullConsumer.js

`pullConsumer.js` is a simple script that demonstrates connecting to a stream and consuming events/messages. Default configuration is connecting to localhost CHEFS stream, as defined in `.devcontainer/localhost/jetstream.conf` and running in this devcontainer. You can run against other streams by setting environment variables. See comments in the [code](./pullConsumer.js) for more information.

## NATS Admin Pod

`nats-admin-pod.yaml` is a Kubernetes manifest for deploying a temporary admin pod with NATS CLI tools for troubleshooting and support tasks on OpenShift.

See [README-nats-admin.md](./README-nats-admin.md) for full usage instructions including:
- How to deploy the admin pod and required NetworkPolicy
- Common NATS CLI commands for checking stream configurations
- How to cleanup after your support session
