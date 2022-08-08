# Extract Private Key

Inbound-Saml module needs the private key to access the persistence API through UMA flow.

You can check the KID for RS256 Navigating to OpenId > Clients > Api RP, on the Signing / Encryption tabs there is a json showing the `kid` for the `rs 256`.

1. Dump the private keys on screen (i.e. `openssl pkcs12 -info --nocerts -in /etc/certs/api-rp.p12 -nodes` );
2. Find the private key with `rs_256` alg;
3. Take note of the `kid`, needed to setup inbound-saml module;
4. Copy from `-----BEGIN PRIVATE KEY-----` to `-----END PRIVATE KEY-----` and save it to a file (i.e. `rs256pvk.pem`).
