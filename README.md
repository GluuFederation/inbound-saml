# Inbound Saml

```ascii                                                
             -/:`                         
             sss-                         
             sss-                         
  ------.`   sss-                         
 :ssssssss/` sss-`oso`   +ss.`oso`   +ss. 
 :sso:.-+ss+ sss-`sss.   oss-`sss.   oss- 
 /sso`  :sso sss-`sss.   oss-`sss.   oss- 
 `osssoosss- sss- +sso::+sss- +sso::+sss- 
   -/++osss/ oss.  :osssssss.  :ossssoss. 
  .-----+sso  `      ```` ``      ``` ``  
 :ssssssss+.                              
  .------`                                        
```

This module is responsible for acting as a single SP proxy.

It's initially intended to be used by [gluu-server](https://gluu.org):

![InboundSamlFlow](docs/img/InboundSamlSingleSP.png)

## Features

  - [ ] Automatic fetch remote IDP data from metadata
  - [ ] Automatic remote idp key rotation handling
  - [ ] Expose single metadata to be consumed by all remote IDPs
  - [ ] Create (register) remote IDP provider providing metadata url or metadata file
  - [ ] SP initiated authentication
  - [ ] IDP initiated authentication

## Developing

Please check [`CONTRIBUTING.md`](CONTRIBUTING.md)

## Internal Reusable Modules

  Independent modules:
  
  - [`@get-saml-metadata`](src/get-saml-metadata)

## Support

You can ask and find related questions in [gluu community support portal](https://support.gluu.org)