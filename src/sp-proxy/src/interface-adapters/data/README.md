# //interface-adapters/data

Here are the use-cases gateways implementations to communicate with "external world" and to handle details

## Filename Convention

External Service + Gateway Interface Name (without the 'gateway' word)

ex: Ldap adapter to get an entry that **implements** `IGetRemoteIdpGateway` should be named `LdapGetRemoteIdp`.
(`Ldap` (external service) + `GetRemoteIdp` gateway interface name)