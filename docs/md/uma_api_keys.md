## Get public key id

1. Check jwks from `API Requesting Party Client`: from UI on **OpenID Connect > Clients > `API Requesting Party Client` > Ecryption/Signing settings > JWKS**
2. Look for the key containing `alg: RS256` and copy/save the `kid`.
3. Keep it, you gonna need it to sign the payload in the next steps.

## Get the private key

1. Convert `/etc/certs/api-rp.jks` to p12 using `keytool` , source key is `secret`
	example:
	```
	 keytool -importkeystore -srckeystore api-rp.jks -destkeystore api-rp.p12 -srcstoretype JKS -deststoretype PKCS12 -deststorepass secret
	```
2. Create unencrypted pem file from p12, or just screen it using `openssl pkcs12 -info -in api-rp.p12 -nodes`
3. look for the same `kid` as copied in step 2 from **Get public key**, copy from `-----BEGIN PRIVATE KEY-----` to `-----END PRIVATE KEY-----` and paste to a `pem` file.
4. Note the exact path from your `pem` file that will be used later

