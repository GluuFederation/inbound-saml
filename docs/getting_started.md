# Getting Started

## Side Install to Gluu Server 4.4.x

1. Download and Add Persistence API jar
2. Extract and save the required UMA Api RP Key
3. Enable `oxtrust_api_access_policy`. Navigate to  `Configuration`  >  `Manage Custom Scripts` > `UMA RPT Policies`
4. Download and extract latest `inbound-saml` release
5. Go to `inbound-saml` folder and run `yarn build`.
6. Configure according to **Production Settings** above
7. Start in production mode using `yarn start`

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

The configuration about the SP Proxy Service itself (and not about the http server) is located at a json file that implements `SpProxyConfigProps`

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

In the development settings, you can use the ENV variables or change/enter default values to files:

- **Persistence API Settings** : `packages/sp-proxy/src/frameworks-drivers/main/config`
- **SP Proxy Server Settings**: `packages/sp-proxy/src/interface-adapters/config/env.ts`
- **SP Proxy Service Settings**: `packages/sp-proxy/src/frameworks-drivers/file-persistence/sp-proxy-config-dev.json`

To run the package use `NODE_ENV=dev yarn dev`
