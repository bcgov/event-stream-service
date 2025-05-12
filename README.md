# Event Stream Service

TODO: fill this in when we make it a BCGov repo.

## Directory Structure

    .devcontainer                  - Visual Studio Code devcontainer and local environment config
    .github/                       - PR and Issue templates
    .vscode/                       - Visual Studio Code's Launcher and Tasks
    app/                           - Application server/backend code
    ├── src/                       - Node.js Express application
    └── tests/                     - server/backend tests (jest)
    charts/                        - Vue.js frontend code
    ├── event-stream-service/      - Helm charts for Event Stream Service (nats.io)
    ├── event-stream-service-app/  - Helm charts for Event Stream Service application
    frontend/                      - Vue.js frontend code
    ├── src/                       - frontend source (vue)
    └── tests/                     - frontend tests (vitest)
    tools/                         - ESS (javascript nats.io) client code examples
    CODE-OF-CONDUCT.md             - Code of Conduct
    COMPLIANCE.yaml                - BCGov PIA/STRA compliance status
    CONTRIBUTING.md                - Contributing Guidelines
    LICENSE                        - License
    SECURITY.md                    - Security Policy and Reporting

## Documentation

- [Application Readme](app/README.md)
- [Frontend Readme](frontend/README.md)
- [Security Reporting](SECURITY.md)

## Help, Problems, and Feature Requests

To report a problem with ESS please create a [GitHub Issue](https://github.com/bcgov/event-stream-service/issues).

## How to Contribute

If you would like to contribute, please see our [contributing](CONTRIBUTING.md) guidelines.

Please note that this project is released with a [Contributor Code of Conduct](CODE-OF-CONDUCT.md). By participating in this project you agree to abide by its terms.

## License

    Copyright 2020 Province of British Columbia

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
