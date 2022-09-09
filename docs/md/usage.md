# Inbound-Saml Features

Inbound-Saml acts a single SP Proxy in inbound identity.

## Add Trusted IDP

You can add a trusted IDP posting directly to [**Persistence API**](/docs/md/persistence_api.md) or by using the module's feature (recommended) to add a TR directly from an IDP's metadata URL by sending a `POST` request to `inbound-saml/trust-relation-metadata` following [this](/openapi.yml) OpenAPI specification.

## Authorization

Inbound-Saml `sp/authenticate` endpoint expects to receive a call with `providerHost` parameter. In Gluu Server 4 (`<= 4.4.1`) this is usually done by the interception script, because a pre-auth session needs to be established by Gluu Server. The default interception script expects to receive a Base64 URL Safe Encoded object in the following format:

```json
{
  "providerHost": "idp.mycustomer.org"
}
```

After encoding this object, this object should be passed to gluu-server (OxAuth) authorization endpoint, with the proper `acr_values` (i.e. `inbound_saml`).

The interception script establishes pre-auth session, decodes the `providerHost` query parameter, and calls (redirects to) **Inbound Saml** `/sp/authenticate` endpoint with the expected `providerHost` parameter to continue the flow.

An example of the authorization request would be as follows:

```
GET https://<hostname>/oxauth/restv1/authorize?response_type=code&client_id=<client id>&redirect_uri=<callback uri>&scope=openid+profile+email+profile&state=<state>&acr_values=inbound_saml&providerHost=eyAicHJvdmlkZXJIb3N0IiA6ICJzYW1sdGVzdC5pZCIgfQ%3D%3D&nonce=YPsYOvGgipNq3tBc02Ow
```


Please check detailed flow example using an external RP and `HTTP-POST` binding:

![Auth Flow Example Web Sequence Diagram](/docs/img/AuthFlowSequenceDiagram.png)
