# Inbound-Saml Features

Inbound-Saml acts a single SP Proxy in inbound identity.

## Add Trusted IDP

You can add a trusted idp posting directly to [**Persistence API**](/docs/md/persistence_api.md) or using the module's feature to add TR directly from Metadata URL [posting to it's endpoint](/openapi.yml).

## Auth

Inbound-Saml `sp/authenticate` endpoint expects to receive a call with `providerHost` param. In Gluu Server 4 (`<= 4.4.0`) this is usually done by the interception script, because a pre-auth session needs to be stablished by Gluu Server. The default interception script expects to receive a Base64 URL Safe Encoded object in the following format:

```json
{
  "providerHost": "idp.mycustomer.org"
}
```

After encoding this object, this object should be passed to gluu-server (OxAuth) authorization endpoint, with the propper `acr-values` (i.e. `inbound_saml`).

The interception script stablish pre-auth session, decodes the `providerHost` queryparam, and calls (redirects to) **Inbound Saml** `/sp/authenticate` endpoint with the expected `providerHost` param to continue the flow.

Please chectk detailed flow example using an external RP and `HTTP-POST` binding:

![Auth Flow Example Web Sequence Diagram](/docs/img/AuthFlowSequenceDiagram.png)
