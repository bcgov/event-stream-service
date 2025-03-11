# event-stream-service-app

Helm charts to deploy 'Event Stream Service Application', there are separate charts to deploy the 'Event Stream Service'. These charts are meant to be run in a CI/CD pipeline (Github Actions) but can be run from the command line. The following instructions are for running the charts manually.

**This assumes you have [Openshift command line](https://docs.openshift.com/container-platform/4.16/cli_reference/openshift_cli/getting-started-cli.html) and [Helm](https://helm.sh) installed locally.**

## Basic Instructions

1. get your Openshift token
2. use oc login to your namespace
3. navigate to the repository root.
4. run the `helm` install / upgrade command (include the environment override file)

```
oc login --token=sha256~yk5BCjn0syJV0qXEyPk12s09v-RIdmTeLVdQmQrQEBc --server=https://api.silver.devops.gov.bc.ca:6443
helm upgrade --install event-stream-service-app ./charts/event-stream-service-app -f ./charts/event-stream-service-app/values.yaml -f ./charts/event-stream-service-app/values-dev.yaml
```

### To remove

1. get your Openshift token
2. use oc login to your namespace
3. run the `helm` uninstall command

```
oc login --token=sha256~yk5BCjn0syJV0qXEyPk12s09v-RIdmTeLVdQmQrQEBc --server=https://api.silver.devops.gov.bc.ca:6443
helm uninstall event-stream-service-app
```

### Changes and Dry run

If you have made changes to charts or values you should perform a dry-run before committing or running the charts. Examine the output to ensure the changes are as you expect.

```
oc login --token=sha256~yk5BCjn0syJV0qXEyPk12s09v-RIdmTeLVdQmQrQEBc --server=https://api.silver.devops.gov.bc.ca:6443
helm upgrade --install event-stream-service-app ./charts/event-stream-service-app -f ./charts/event-stream-service-app/values.yaml -f ./charts/event-stream-service-app/values-dev.yaml --dry-run
```
