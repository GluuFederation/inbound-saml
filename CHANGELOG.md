# Changelog

## [0.15.0](https://www.github.com/GluuFederation/inbound-saml/compare/v0.14.0...v0.15.0) (2022-07-11)


### Features

* **logger:** setup daily rotation ([80f4591](https://www.github.com/GluuFederation/inbound-saml/commit/80f4591de7260e020bda90f3fb859f42a0876741))
* **logging:** setup according to gluu-server patterns ([a93b141](https://www.github.com/GluuFederation/inbound-saml/commit/a93b141c22f5970b0db6096b88ecfe876097044d))
* **serverConfig:** parse int and bool from env ([a56f969](https://www.github.com/GluuFederation/inbound-saml/commit/a56f96972c76eccfc6c01911ae9256b03de606e5))
* **server:** log start info ([bd4c429](https://www.github.com/GluuFederation/inbound-saml/commit/bd4c429b55d29cd83b94f4ca0fa455b1ffad58b6))

## [0.14.0](https://www.github.com/GluuFederation/inbound-saml/compare/v0.13.3...v0.14.0) (2022-07-08)


### Features

* **config:** validate config loaded from env ([#138](https://www.github.com/GluuFederation/inbound-saml/issues/138)) ([0c62053](https://www.github.com/GluuFederation/inbound-saml/commit/0c62053c8e485eaf2ae4d8e9835831bea05fde41))

### [0.13.3](https://www.github.com/GluuFederation/inbound-saml/compare/v0.13.2...v0.13.3) (2022-06-29)


### Bug Fixes

* **config:** correct env var name for `proxyConfigPath` ([2aaa2d9](https://www.github.com/GluuFederation/inbound-saml/commit/2aaa2d931be505ef2930ce49f00eb7eeada0d3d9))
* **config:** update configuration env variables names  ([#135](https://www.github.com/GluuFederation/inbound-saml/issues/135)) ([2aaa2d9](https://www.github.com/GluuFederation/inbound-saml/commit/2aaa2d931be505ef2930ce49f00eb7eeada0d3d9))
* remove old unused persistence configuration ([2aaa2d9](https://www.github.com/GluuFederation/inbound-saml/commit/2aaa2d931be505ef2930ce49f00eb7eeada0d3d9))

### [0.13.2](https://www.github.com/GluuFederation/inbound-saml/compare/v0.13.1...v0.13.2) (2022-06-28)


### Bug Fixes

* **CreateRemoteIdp:** throws if no host param ([#133](https://www.github.com/GluuFederation/inbound-saml/issues/133)) ([e1c969f](https://www.github.com/GluuFederation/inbound-saml/commit/e1c969f172414b06fd44467eacfd769ddcca5d4b))

### [0.13.1](https://www.github.com/GluuFederation/inbound-saml/compare/v0.13.0...v0.13.1) (2022-06-11)


### Bug Fixes

* **UmaAuthenticator:** add needed content-type headers ([92a25e7](https://www.github.com/GluuFederation/inbound-saml/commit/92a25e7a83f3a96f15d69fc520607fea54ce306e))

## [0.13.0](https://www.github.com/GluuFederation/inbound-saml/compare/v0.12.0...v0.13.0) (2022-05-11)


### Features

* **server:** turn ssl into optional ([#127](https://www.github.com/GluuFederation/inbound-saml/issues/127)) ([5428ea2](https://www.github.com/GluuFederation/inbound-saml/commit/5428ea2c06c33eeab3b082c8c139b78fcfa36a8e))

## [0.12.0](https://www.github.com/GluuFederation/inbound-saml/compare/v0.11.0...v0.12.0) (2022-03-29)


### Features

* **authenticator:** add propper message to error ([d23ca1c](https://www.github.com/GluuFederation/inbound-saml/commit/d23ca1c6ba9b980a0a9d867494798f2fe63172fa))
* **getTrByHost:** use oxTrust api to get trust relation ([#114](https://www.github.com/GluuFederation/inbound-saml/issues/114)) ([5383ff5](https://www.github.com/GluuFederation/inbound-saml/commit/5383ff5970a1d9a91e33601ea00a6e321d6d42e3))
* **oxTrustApi:** add `UMA` auth flow to client ([#113](https://www.github.com/GluuFederation/inbound-saml/issues/113)) ([375e96a](https://www.github.com/GluuFederation/inbound-saml/commit/375e96aea5d9cf3688397842897612f714f0e3af))
* **oxTrustCreateTr:** create TR using persistence api ([#112](https://www.github.com/GluuFederation/inbound-saml/issues/112)) ([45b039e](https://www.github.com/GluuFederation/inbound-saml/commit/45b039e4e5c74aed8e9b0431c39deda0da39f156))


### Bug Fixes

* **authenticator:** parse hostname from origin ([576bce4](https://www.github.com/GluuFederation/inbound-saml/commit/576bce475dfb7c0e0604e9d072dc89f7fa0bc387))
* remove mongoDB ([#115](https://www.github.com/GluuFederation/inbound-saml/issues/115)) ([4e88f61](https://www.github.com/GluuFederation/inbound-saml/commit/4e88f61d35952670b7792b9cc7483292110c021f))
* UMA token handling in `AddTrustRelation` ([#117](https://www.github.com/GluuFederation/inbound-saml/issues/117)) ([798b763](https://www.github.com/GluuFederation/inbound-saml/commit/798b763560f3e709aa02fb9bf669ded819a223f3))
* **UmaAuthenticator:** use correct methods to request ticket # ([#122](https://www.github.com/GluuFederation/inbound-saml/issues/122)) ([d7a7b5d](https://www.github.com/GluuFederation/inbound-saml/commit/d7a7b5dd68d560860592f77c72064b8a3153dcc7))

## [0.11.0](https://www.github.com/GluuFederation/inbound-saml/compare/v0.10.0...v0.11.0) (2021-10-12)


### Features

* **pickDefaultSso.ts:** change default sso binding to HTTP-Redirect ([#92](https://www.github.com/GluuFederation/inbound-saml/issues/92)) ([80bbf65](https://www.github.com/GluuFederation/inbound-saml/commit/80bbf6543db9654677b628bb81967d838a046b7a)), closes [#90](https://www.github.com/GluuFederation/inbound-saml/issues/90)
* **SpInitAuthn:** return auto-submit form ([fc92f23](https://www.github.com/GluuFederation/inbound-saml/commit/fc92f231b8b1b9576ba94a3f7604bbedfe4c4cf9))
* **SpInitiatedAuthn:** ACS / callback route ([#95](https://www.github.com/GluuFederation/inbound-saml/issues/95)) ([52fe457](https://www.github.com/GluuFederation/inbound-saml/commit/52fe457a0b1a4117dee5077ee209ce1947a3bcbc))


### Bug Fixes

* **MetadataGenerator:** passport adapter use well formatted `pem` format ([#94](https://www.github.com/GluuFederation/inbound-saml/issues/94)) ([458f18f](https://www.github.com/GluuFederation/inbound-saml/commit/458f18f83ef4b98220e077a553e7817d2265c69d))
* **spInitAuthn:** remove quote-marks from auto-submit form ([#100](https://www.github.com/GluuFederation/inbound-saml/issues/100)) ([81960d2](https://www.github.com/GluuFederation/inbound-saml/commit/81960d23ddb6eec30d9dae69b690fe8bc57591e7))

## [0.10.0](https://www.github.com/GluuFederation/inbound-saml/compare/v0.9.0...v0.10.0) (2021-09-06)


### Features

* **readProxyCfg:** add controller to dispatch request ([#84](https://www.github.com/GluuFederation/inbound-saml/issues/84)) ([8b1d8d4](https://www.github.com/GluuFederation/inbound-saml/commit/8b1d8d4e61a60f5e6db8b0b18df0b4d649067cdd))
* **readProxySpConfig:** add sync facade ([#87](https://www.github.com/GluuFederation/inbound-saml/issues/87)) ([36edf54](https://www.github.com/GluuFederation/inbound-saml/commit/36edf54de0955b6ca3cb91141b39cfd431588f49))
* **readSpProxyConfig:** add controller mapper ([#86](https://www.github.com/GluuFederation/inbound-saml/issues/86)) ([57cc69d](https://www.github.com/GluuFederation/inbound-saml/commit/57cc69d983bf7959ba9d3f3d361810fe78724342))
* **readSpProxyConfig:** add result dispatcher ([#85](https://www.github.com/GluuFederation/inbound-saml/issues/85)) ([0a9f95f](https://www.github.com/GluuFederation/inbound-saml/commit/0a9f95f209de7032eda92eecfae0da312a31f018))
* **readSpProxyConfig:** add use case interactor ([#81](https://www.github.com/GluuFederation/inbound-saml/issues/81)) ([3642582](https://www.github.com/GluuFederation/inbound-saml/commit/364258265106275125c2358f018f7dd5e4faf8f3))
* **transformer:** transform cfg entity into response model ([#83](https://www.github.com/GluuFederation/inbound-saml/issues/83)) ([f24a271](https://www.github.com/GluuFederation/inbound-saml/commit/f24a271cf55c6d5768d808318a97e7065d93a1e6))

## [0.9.0](https://www.github.com/GluuFederation/inbound-saml/compare/v0.8.0...v0.9.0) (2021-09-02)


### Features

* **controllerLogger:** add log decorator to controllers used by routes ([#70](https://www.github.com/GluuFederation/inbound-saml/issues/70)) ([9e93862](https://www.github.com/GluuFederation/inbound-saml/commit/9e93862efdc18250295e848c01164eb9aad4d65a))
* **errorLogger:** add error logger decorator to error handler ([#76](https://www.github.com/GluuFederation/inbound-saml/issues/76)) ([7ff687e](https://www.github.com/GluuFederation/inbound-saml/commit/7ff687ef466323f02899d908c440021a6c0f1e3d))

## [0.8.0](https://www.github.com/GluuFederation/inbound-saml/compare/v0.7.0...v0.8.0) (2021-08-30)


### Features

* **AddTrFromMetadata:** add protected endpoint for executing action ([#66](https://www.github.com/GluuFederation/inbound-saml/issues/66)) ([4900954](https://www.github.com/GluuFederation/inbound-saml/commit/490095417e39186be5275e1f3ebc92ce46bc45c6))

## [0.7.0](https://www.github.com/GluuFederation/inbound-saml/compare/v0.6.0...v0.7.0) (2021-08-27)


### Features

* **GetTrByHost:** get Trust Relation by host ([#57](https://www.github.com/GluuFederation/inbound-saml/issues/57)) ([656011c](https://www.github.com/GluuFederation/inbound-saml/commit/656011c89f7afa8569a3dc8431bcfebd4d3c2243))


### Bug Fixes

* **security:** update passport-saml to fix vulnerability ([#64](https://www.github.com/GluuFederation/inbound-saml/issues/64)) ([e2e80a3](https://www.github.com/GluuFederation/inbound-saml/commit/e2e80a365917ad0275c93fa798c53e87f2bedaa4))

## [0.6.0](https://www.github.com/GluuFederation/inbound-saml/compare/v0.5.0...v0.6.0) (2021-08-25)


### Features

* add swagger file ([#53](https://www.github.com/GluuFederation/inbound-saml/issues/53)) ([88ed543](https://www.github.com/GluuFederation/inbound-saml/commit/88ed5439dc9311a511d6ff8e2d99f9fc2bca8c29))
* **GenerateSpMetadata:** generate and expose sp metadata ([#51](https://www.github.com/GluuFederation/inbound-saml/issues/51)) ([37dcbde](https://www.github.com/GluuFederation/inbound-saml/commit/37dcbde1d7466fca93b05c4782623dc57e9f6895))


### Miscellaneous Chores

* release 0.6.0 ([63b289e](https://www.github.com/GluuFederation/inbound-saml/commit/63b289e635f6a366b14256e1d343f5668acbe812))

## [0.5.0](https://www.github.com/GluuFederation/inbound-saml/compare/v0.4.0...v0.5.0) (2021-08-18)


### Features

* **AddTrFromMetadata:** add TrustRelation from metadata url ([#45](https://www.github.com/GluuFederation/inbound-saml/issues/45)) ([3da89f6](https://www.github.com/GluuFederation/inbound-saml/commit/3da89f643f323a251a038c4d019dbe5c847efc60))


### Miscellaneous Chores

* release 0.5.0 ([3ef9399](https://www.github.com/GluuFederation/inbound-saml/commit/3ef9399a825507d58b6e18710236222155cd9ba9))

## [0.4.0](https://www.github.com/GluuFederation/inbound-saml/compare/v0.3.0...v0.4.0) (2021-08-17)


### Features

* **GetRemoteIdp:** get remote idp entity ([#43](https://www.github.com/GluuFederation/inbound-saml/issues/43)) ([6f323b3](https://www.github.com/GluuFederation/inbound-saml/commit/6f323b35b98179a5513e501f326982a0b580facb))


### Miscellaneous Chores

* release 0.4.0 ([b924282](https://www.github.com/GluuFederation/inbound-saml/commit/b924282568ecffe2c00c1d2557ba405c10cf9af0))

## [0.3.0](https://www.github.com/GluuFederation/inbound-saml/compare/v0.2.0...v0.3.0) (2021-08-14)


### Features

* CreateRemoteIdp ([#36](https://www.github.com/GluuFederation/inbound-saml/issues/36)) ([abbfda5](https://www.github.com/GluuFederation/inbound-saml/commit/abbfda544636d0b23edcd614892435f0dae62847))


### Miscellaneous Chores

* release 0.3.0 ([d37c2f5](https://www.github.com/GluuFederation/inbound-saml/commit/d37c2f54df3e08a311461697517c854fa92464b9))

## [0.2.0](https://www.github.com/GluuFederation/inbound-saml/compare/v1.0.0...v0.2.0) (2021-08-07)


### Features

* add token ([10cd478](https://www.github.com/GluuFederation/inbound-saml/commit/10cd478309e3862cb983de30db72cb46927aab6a))
* another ([a1b5ad3](https://www.github.com/GluuFederation/inbound-saml/commit/a1b5ad39aefab8f41a905568f3bd76de6c4411f3))
* dummy feat ([bd7a2b9](https://www.github.com/GluuFederation/inbound-saml/commit/bd7a2b9934b69d190a0f9e9ec7243dcc02a21133))
* **getFromUrl:** get external data from metadata url  ([#27](https://www.github.com/GluuFederation/inbound-saml/issues/27)) ([e86e379](https://www.github.com/GluuFederation/inbound-saml/commit/e86e3797b158510e6e94837d624ddd225110bace))
* release  dummy ([#21](https://www.github.com/GluuFederation/inbound-saml/issues/21)) ([1140b78](https://www.github.com/GluuFederation/inbound-saml/commit/1140b78c30bedb3be5086a4bca2b523ad43b0b7b))


### Bug Fixes

* delete old changelog ([#25](https://www.github.com/GluuFederation/inbound-saml/issues/25)) ([6064172](https://www.github.com/GluuFederation/inbound-saml/commit/6064172b7be5729ef300e6ae118d139a0584667a))
* remove secrets ([dc06f8a](https://www.github.com/GluuFederation/inbound-saml/commit/dc06f8adea18d82c9b8ade0e6c17cfbfa02a51e5))


### Miscellaneous Chores

* release 0.2.0 ([eda2eae](https://www.github.com/GluuFederation/inbound-saml/commit/eda2eaeac73e506988a6887b4302f2553b4f5b5e))
