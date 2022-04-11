# Sidecar install by Gluu-Server 4.3.x

*Note*: Make sure you have **installed gluu-server** 4.3.

1. [Install **Inbound Saml Persistence Api**](persistence_api.md)
2. [Setup and prepare the **UMA api RP key**](uma_api_keys.md)
3. Clone `inbound-saml` project to your local folder (outside chroot)
4. Setup persistence configuration env variables:

| ENV variable name       | Description                        |
|---------------------------------------|----------------------------------------------------------|
| `INBOUND_SAML_OXTRUST_API_HOST`       | hostname (i.e gluu.mydomain.com)                         |
| `INBOUND_SAML_OXTRUST_CLIENT_ID`      | api-rp client id                                         |
| `INBOUND_SAML_OXTRUST_API_TOKEN_URL`  | complete oxAuth token url                                |
| `INBOUND_SAML_OXTRUST_API_KID`        | the RS256 key id from api-rp jwks                        |
| `INBOUND_SAML_OXTRUST_API_PVK_PATH`   | complete path to the `pem` file created from api-rp jwks |
| `PROXY_CFG_PATH`   | complete path to the json file, usualy located at `packages/sp-proxy/src/frameworks-drivers/file-persistence/sp-proxy-config.json` |
|                                       

