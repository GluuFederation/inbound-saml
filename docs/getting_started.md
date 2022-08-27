# Getting Started

## Side Install to Gluu Server 4.4.x

1. [Download and add Persistence API jar](/docs/md/persistence_api.md).
2. [Extract and save the required UMA API RP Key](/docs/md/extract_private_key.md).
3. Navigate to  `Configuration` > `Manage Custom Scripts` > `UMA RPT Policies` and enable `oxtrust_api_access_policy`.
4. Go to `JSON Configuration` > `oxAuth Configuration` and look for `authorizationRequestCustomAllowedParameters`. Add the parameter `providerHost`.
5. Add [inbound_saml interception script](https://gist.github.com/christian-hawk/3c9b982cd2e226fb27537665a770036b) to `Configuration` > `Person Authentication Scripts` and enable it.
6. Ensure you have [node](https://nodejs.org/en/download/) and [yarn](https://yarnpkg.com/getting-started/install) installed in your environment (outside chroot).
7. Download and extract latest `inbound-saml` release **outside** the chroot container.
8. Move `inbound-saml-v.X.Y.z` folder to `/opt/inbound-saml` folder
9. Move systemd unit file to `/etc/systemd/system`. (i.e. `sudo mv /opt/inbound-saml/setup/inboundsaml.service /etc/systemd/system`)
10. Change ownership from service to root user (`chown root:root /etc/systemd/system/inboundsaml.service`)
11. Create `inboundsaml` user in linux. (i.e. `sudo adduser inboundsaml`) (required in production env only)
12. Change ownership from `/opt/inbound-saml` folder to `inboundsaml` user. (required in production env only) (i.e. `sudo chown -R inboundsaml /opt/inbound-saml`)
13. Go to `inbound-saml` folder and run `yarn`, then `yarn build`. (required in production env only)
14. Configure according to either [Production Settings](#production-settings) or [Development Environment Settings](#development-environment-settings) below.
15. Edit apache configuration file (`/etc/apache2/sites-available/https_gluu.conf` on Ubuntu Server) and add `Location` from `/inbound-saml` to port `5000`, example:

```conf
<Location /inbound-saml>
        ProxyPass http://localhost:5000/inbound-saml retry=5 connectiontimeout=60 timeout=60
        Order deny,allow
        Allow from all
</Location>
```

16. Start systemd service: `sudo systemctl start inboundsaml`
17. Enable it to start automatically on boot: `sudo systemctl enable inboundsaml`

## Production Settings

### Persistence API Settings

Data layers calls oxTrust REST API that handles persistence to multiple backends

| Environment Variable                     | Description    | Default value |
|-|-|-|
| `INBOUND_SAML_OXTRUST_API_HOST`          | The oxTrust Api Host (i.e. `mysubdomain.mydomain.org`)                                | None                                  |
| `INBOUND_SAML_OXTRUST_CLIENT_ID`         | OxTrust **API RP** client ID. Open ID Client ID for API Ressource Provider.           | None                                  |
| `INBOUND_SAML_OXTRUST_API_COMPLETE_PATH` | OxTrust API Complete Path. (without the first forward slash)                          | `identity/restv1/api/v1/inbound-saml` |
| `INBOUND_SAML_OXTRUST_API_TOKEN_URL`     | OxTrust API Token Url. URL to get token fro oxAuth for accessing the persistence api. | None                                  |
| `INBOUND_SAML_OXTRUST_API_KID`           | Oxtrust **API RP** rs256 `kid` (extracted from jwks)                                  | None                                  |
| `INBOUND_SAML_OXTRUST_API_PVK_PATH`      | Oxtrust **rs256 Private Key** extracted from api-rp jwks with above `kid`             | None                                  |

### SP Proxy Server Settings

Proxy server is used to expose and address services through REST API.

| Environment Variable           | Description                                                                                                       | Default value |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------|---------------|
| `INBOUND_SAML_ADMIN_USER`      | User allowed to add a trusted IDP through the Add Trusted Idp from Metadata feature                               | `admin`       |
| `INBOUND_SAML_ADMIN_PWD`       | Password to the user above                                                                                        | `admin`       |
| `INBOUND_SAML_LOG_LEVEL`       | Log level, `error`, `warn`, `info`, `debug`                                                                       | `info`        |
| `INBOUND_SAML_PORT`            | Port to run the server                                                                                            | `5000`        |
| `INBOUND_SAML_USE_TLS`         | Require TLS to connect to SP Proxy: `true` or `false`. Notice that if set to `true`, 2 fields bellow are required | `false`       |
| `INBOUND_SAML_TLS_CERT_PATH`   | If `INBOUND_SAML_USE_TLS` set to `true`, the full or relative path to the TLS certificate.                        | None          |
| `INBOUND_SAML_TLS_KEY_PATH`    | If `INBOUND_SAML_USE_TLS` set to `true`, the full or relative path to the TLS certificate.                        | None          |
| `INBOUND_SAML_PROXY_CFG_PATH`  | The complete path to the Service Provider configuration json file.                                                | None          |

### SP Proxy Service Settings

The configuration about the SP Proxy Service itself (and not about the http server) is located at a json file that implements `SpProxyConfigProps` (`inbound-saml/packages/sp-proxy/src/frameworks-drivers/file-persistence/sp-proxy-config-dev.json`).

|key| description | default |
|--|--|--|
| `host` | host name i.e. mysub.mydomain.org | None |
| `identifierFormat` | name identifier format to request from identity providers | `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`  |
| `skipRequestCompression` | If `true` requests to the IDP won't be compressed. POST-Redirect usually uses `false`. | `false` |
| `decryption`| Object (`CertKeySetPath`) containing `publicCertPath` and `privateKeyPath` to certificate and private keys used to **decrypt** requests | None |
|`signing`| **Optional** Object (`CertKeySetPath`) containing `publicCertPath` and `privateKeyPath` to certificate and private keys used to **sign** requests  | None |
|`postProfileUrl`| Url that profile will be posted to, if authentication succeed.  | default |

## Development Environment Settings

When `NODE_ENV=dev`, development environment is activated.

In the development settings, you can use the environment variables or change/enter default values to files:

- **Persistence API Settings** : `packages/sp-proxy/src/frameworks-drivers/main/config`
- **SP Proxy Server Settings**: `packages/sp-proxy/src/interface-adapters/config/env.ts`
- **SP Proxy Service Settings**: `packages/sp-proxy/src/frameworks-drivers/file-persistence/sp-proxy-config-dev.json`

To run the package use `NODE_ENV=dev yarn dev`
