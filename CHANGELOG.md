# Changelog

## 1.0.0 (2021-07-29)


### Features

* ensure FileIdpMetadata loads itself ([5673865](https://www.github.com/GluuFederation/inbound-saml/commit/56738655804b57e7845599d20feaadd2acb7bfc8))
* ensure it does deep comparison ([42b6efc](https://www.github.com/GluuFederation/inbound-saml/commit/42b6efc64786d4811639da4d2ac2b2eb2ecc91c1))
* ensure validator calls `existsSync` correctly ([ca2ddbe](https://www.github.com/GluuFederation/inbound-saml/commit/ca2ddbe1a5f6ffc9dc4df08da961598fabca87e2))
* ensure XmlMetadata constructor calls `isValid` ([7ce87e2](https://www.github.com/GluuFederation/inbound-saml/commit/7ce87e2e9c73fa0b089f4135250babd7f71db6e9))
* **FileLoader:** ensure loader works correctly ([db84c6c](https://www.github.com/GluuFederation/inbound-saml/commit/db84c6c2d0e1bc9e2082b3c518b639fecf4c247c))
* **FileValidatorAdapter:** ensure return correct boolean ([546638b](https://www.github.com/GluuFederation/inbound-saml/commit/546638b3dd5b3a995e9597e588c026b1090862ba))
* **IdpMetadata:** ensure `load` is called in constructor ([8a8eb45](https://www.github.com/GluuFederation/inbound-saml/commit/8a8eb4551d390666e309e9c597691e368bd87acf))
* **IdpMetadata:** ensure data is loaded to prop ([aa27c40](https://www.github.com/GluuFederation/inbound-saml/commit/aa27c402a17d62bf4fdc38a3ed62576a423379c6))
* **IdpMetadata:** ensure invalid throws `InvalidPathOrUrlError` ([41c71c6](https://www.github.com/GluuFederation/inbound-saml/commit/41c71c672cb20063b223e494a64456fe72bad0a6))
* **IdpMetadata:** ensure loader is called w/ correct values ([b47ba0b](https://www.github.com/GluuFederation/inbound-saml/commit/b47ba0bc2c28527070bd6a6df84bfc166d0bba4f))
* **IdpMetadata:** ensure throws if invalid `urlOrPath` ([dcad2f8](https://www.github.com/GluuFederation/inbound-saml/commit/dcad2f866fa32fd1b292d2d6bfc9df74bafccaf9))
* provider interface ([9937c58](https://www.github.com/GluuFederation/inbound-saml/commit/9937c581c74f96113d044c8be23ee99004bd0695))
* **shallowEqual:** ensure false if different values ([cad2e4c](https://www.github.com/GluuFederation/inbound-saml/commit/cad2e4c8c6c2845d63046a9b8c2b8f181e100fed))
* **shallowEqual:** ensure returns false if diff lenght ([fbbe13f](https://www.github.com/GluuFederation/inbound-saml/commit/fbbe13fc1f5aa06764fc812336bc96ab660492b5))
* **XmlMetadata:** ensure it throws if validator throws ([8a99895](https://www.github.com/GluuFederation/inbound-saml/commit/8a998954b309505bbdb15a639791451e89090e63))
* **XmlValidato:** ensure it calls xml parser with correct value ([ba21f4e](https://www.github.com/GluuFederation/inbound-saml/commit/ba21f4e0bcbd93da94f870e05accc0d5c45f1675))
* **XmlValidator:** ensure `isValid` return false if validator returns Error ([dca2b49](https://www.github.com/GluuFederation/inbound-saml/commit/dca2b495149721a75475aea0224b2482a61bf444))
* **XmlValidator:** ensure returns true if validator returns true ([bd3f448](https://www.github.com/GluuFederation/inbound-saml/commit/bd3f448a111d70813d163dff949324d757a6f4cc))


### Bug Fixes

* **FileLoader:** update `IMetadataLoader` import ([891ac9c](https://www.github.com/GluuFederation/inbound-saml/commit/891ac9c59a09b4fa11b868c5fa408814a15a9909))
* rename shallowEqual to deeplyEqual ([259c71f](https://www.github.com/GluuFederation/inbound-saml/commit/259c71fec23132772024ec98befd1d3eec954881))
* **shallowEqual:** add lenght to keys ([c915892](https://www.github.com/GluuFederation/inbound-saml/commit/c915892913043965a3eec87ed9b552d02a239902))
