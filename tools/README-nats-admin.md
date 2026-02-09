# NATS Admin Pod - Support Tool

This document describes how to deploy a temporary admin pod for running NATS CLI commands against the Event Stream Service. This is useful for troubleshooting, checking stream configurations, and other administrative tasks.

## Prerequisites

- `oc` CLI installed and configured
- Logged into the correct OpenShift namespace with appropriate permissions
- Access to run `oc apply`, `oc exec`, and `oc delete` commands

## Quick Reference

```bash
# Deploy
oc apply -f tools/nats-admin-pod.yaml

# Connect
oc exec -it nats-admin -- /bin/sh

# Cleanup
oc delete -f tools/nats-admin-pod.yaml
```

---

## Step 1: Login to OpenShift

Get your token from the OpenShift console and login:

```bash
oc login --token=<your-token> --server=https://api.silver.devops.gov.bc.ca:6443
```

Switch to the correct namespace (e.g., dev, test, or prod):

```bash
oc project a191b5-dev    # dev
oc project a191b5-test   # test  
oc project a191b5-prod   # prod
```

## Step 2: Deploy the Admin Pod and NetworkPolicy

From the repository root, apply the manifest:

```bash
oc apply -f tools/nats-admin-pod.yaml
```

This creates:
- `NetworkPolicy/allow-admin-to-nats` - Allows the admin pod to connect to NATS on port 4222
- `Pod/nats-admin` - The admin pod with NATS CLI tools

Verify the pod is running:

```bash
oc get pod nats-admin -w
```

Wait until the STATUS shows `Running`.

## Step 3: Connect to the Admin Pod

Open a shell session in the pod:

```bash
oc exec -it nats-admin -- /bin/sh
```

## Step 4: Run NATS Admin Commands

### Available Credentials

The pod has these environment variables pre-configured from the `ess-nats-auth` secret:

| Variable | Account | Access Level |
|----------|---------|--------------|
| `$ADMIN_PWD` | admin | Full JetStream access (use this for most tasks) |
| `$SYSADMIN_PWD` | sysadmin | Server monitoring only (no JetStream) |
| `$CHEFS_PWD` | chefs | Limited to CHEFS stream operations |

### Common Commands

**Note:** Due to OpenShift filesystem restrictions, use the raw JetStream API requests (`nats req`) instead of the standard `nats stream` commands. Pipe output to `jq` for readable formatting.

#### List All Streams

```bash
nats req '$JS.API.STREAM.NAMES' '' --user admin --password $ADMIN_PWD | jq .
```

#### Get Full Stream Info (pretty printed)

```bash
nats req '$JS.API.STREAM.INFO.CHEFS' '' --user admin --password $ADMIN_PWD | jq .
```

#### Get Stream Configuration Only

```bash
nats req '$JS.API.STREAM.INFO.CHEFS' '' --user admin --password $ADMIN_PWD | jq '.config'
```

Key config fields:
- `max_age` - Message retention time in **nanoseconds**
- `max_msgs` - Maximum number of messages (-1 = unlimited)
- `max_bytes` - Maximum storage size in bytes (-1 = unlimited)
- `retention` - Retention policy (limits, interest, workqueue)

#### Get Specific Config Values

```bash
# Get max_age (in nanoseconds)
nats req '$JS.API.STREAM.INFO.CHEFS' '' --user admin --password $ADMIN_PWD | jq '.config.max_age'

# Get max_bytes
nats req '$JS.API.STREAM.INFO.CHEFS' '' --user admin --password $ADMIN_PWD | jq '.config.max_bytes'

# Get retention policy
nats req '$JS.API.STREAM.INFO.CHEFS' '' --user admin --password $ADMIN_PWD | jq '.config.retention'
```

#### Get Stream State (message counts, storage used, etc.)

```bash
nats req '$JS.API.STREAM.INFO.CHEFS' '' --user admin --password $ADMIN_PWD | jq '.state'
```

#### Get JetStream Account Info

```bash
nats req '$JS.API.INFO' '' --user admin --password $ADMIN_PWD | jq .
```

#### List Consumers on a Stream

```bash
nats req '$JS.API.CONSUMER.NAMES.CHEFS' '' --user admin --password $ADMIN_PWD | jq .
```

#### Get Consumer Info

```bash
nats req '$JS.API.CONSUMER.INFO.CHEFS.<consumer-name>' '' --user admin --password $ADMIN_PWD | jq .
```

### Unit Conversions

**max_age (nanoseconds to human readable):**
```
900000000000 ns   = 900 seconds   = 15 minutes
1800000000000 ns  = 1800 seconds  = 30 minutes
3600000000000 ns  = 3600 seconds  = 1 hour
86400000000000 ns = 86400 seconds = 24 hours
```

**max_bytes / state.bytes (bytes to MB/GB):**
```
209715200 bytes  = 200 MB
524288000 bytes  = 500 MB
1073741824 bytes = 1 GB
```

### Exit the Pod

```bash
exit
```

## Step 5: Cleanup (Important!)

After completing your support tasks, remove the admin pod and NetworkPolicy:

```bash
oc delete -f tools/nats-admin-pod.yaml
```

Verify cleanup:

```bash
oc get pod nats-admin
# Should show: Error from server (NotFound): pods "nats-admin" not found

oc get networkpolicy allow-admin-to-nats
# Should show: Error from server (NotFound): networkpolicies.networking.k8s.io "allow-admin-to-nats" not found
```

---

## Troubleshooting

### Connection Timeout

If you get `dial tcp ...: i/o timeout`, the NetworkPolicy may not have been applied:

```bash
# Check if NetworkPolicy exists
oc get networkpolicy allow-admin-to-nats

# If missing, reapply
oc apply -f tools/nats-admin-pod.yaml
```

### JetStream Not Enabled Error

If you see `JetStream not enabled for account`, you're using the wrong credentials:

```bash
# Wrong - sysadmin is for $SYS account only
nats req '$JS.API.STREAM.NAMES' '' --user sysadmin --password $SYSADMIN_PWD

# Correct - use admin account
nats req '$JS.API.STREAM.NAMES' '' --user admin --password $ADMIN_PWD
```

### Permission Denied / Schema Errors

The `HOME=/tmp` environment variable should fix this. If you still see issues:

```bash
export HOME=/tmp
nats req '$JS.API.STREAM.INFO.CHEFS' '' --user admin --password $ADMIN_PWD
```

---

## What Gets Deployed

### NetworkPolicy: allow-admin-to-nats

Allows ingress traffic from pods with label `app: nats-admin` to NATS pods on port 4222.

### Pod: nats-admin

- **Image:** `natsio/nats-box:0.14.3`
- **Tools included:** `nats`, `nsc`, `nk`, `jq`
- **Security:** Runs as non-root, no privilege escalation
- **Resources:** 100m CPU / 128Mi memory limits

---

## Security Notes

- The admin pod has access to credentials that provide full control over JetStream
- Always delete the pod and NetworkPolicy when done
- Only deploy in the namespace you need to troubleshoot
- The `oc` commands require appropriate RBAC permissions, limiting who can deploy this
