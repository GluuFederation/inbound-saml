# Get Saml Metadata

Get Saml Metadata is a module used to fetch XML metadata from file or http, parse and map to usable js object.

```
import { getFromFile, getFromUrl } from 'get-saml-data'

const dataFromFile = getFromFile('/uploaded/idp-metadata.xml')
const dataFromUrl = getFromUrl('https://foo.bar/metadata')

```

## Why?

Initialy this module is written to get remote IDP metadata to be used by SP in authn request.
This doesn't mean it can't or will not be enriched to fetch any other data.

## Data

Data object returned.

Example:
```js
{
  idpSigningCert: ['CERTIFICATE_WITH_NO_SPACES_OR_LINEBREAKS'],
  singleSignOnServices: [
    {
      binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
      location: 'https://pocidp.techno24x7.com/idp/profile/SAML2/POST/SSO'
    },
    {
      binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
      location: 'https://remote.idp.com/idp/profile/SAML2/Redirect/SSO'
    },
    {
      binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign',
      location: 'https://pocidp.techno24x7.com/idp/profile/SAML2/POST-SimpleSign/SSO'
    }
  ]
}
```

- `idpSigningCert`: array of IDP signiog certificates (maximum 2)
- `singleSignOnServices`: array of singleSignOnService

# singleSignOnService

Object containing `SingleSignOnService` Binding and Location, indexed in `singleSignOnServices`
