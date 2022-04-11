1) Inside the Gluu chroot, navigate to `/opt/gluu/jetty/identity/custom/libs`;
2) In this folder, download the .jar file corresponding to the Gluu Server version currently installed: https://jenkins.gluu.org/maven/org/gluu/api-rest/4.4.0-SNAPSHOT/api-rest-4.4.0-SNAPSHOT.jar ;
4) Navigate to `/opt/gluu/jetty/identity/webapps/`;
5) Create a file called identity.xml if it does not already exist ; 
6) Add the following to identity.xml as mentioned in doc [identity.xml](https://gluu.org/docs/gluu-server/4.3/api-guide/oxtrust-api/#vm-installation-instructions): 

```xml
<?xml version="1.0"  encoding="ISO-8859-1"?>
<!DOCTYPE Configure PUBLIC "-//Jetty//Configure//EN" "http://www.eclipse.org/jetty/configure_9_0.dtd">

<Configure class="org.eclipse.jetty.webapp.WebAppContext">
  <Set name="contextPath">/identity</Set>
  <Set name="war"><Property name="jetty.webapps" default="."/>/identity.war</Set>
  <Set name="extractWAR">true</Set>

  <Set name="extraClasspath">./custom/libs/[jarName].jar</Set>
</Configure>
```

7) On the second to last line, replace `[jarName]` with the name of the .jar file downloaded in step 2.
8) stop **openDJ** service by command mentioned in document [services](https://gluu.org/docs/gluu-server/4.3/operation/services/)
9) replace the file  `/opt/opendj/config/schema/101-ox.ldif` with latest schema in ldap  https://github.com/GluuFederation/community-edition-setup/blob/master/static/opendj/101-ox.ldif
10) start **openDJ** service by command mentioned in document [services](https://gluu.org/docs/gluu-server/4.3/operation/services/)
11) stop **identity** service by command mentioned in document [services](https://gluu.org/docs/gluu-server/4.3/operation/services/)
12) Download latest identity war file [identity](https://jenkins.gluu.org/maven/org/gluu/oxtrust-server/4.4.0-SNAPSHOT/oxtrust-server-4.4.0-SNAPSHOT.war)
13) Rename **downloaded `war`** to ` /opt/gluu/jetty/identity/webapps/identity.war`
14) start **identity** service by command mentioned in document [services](https://gluu.org/docs/gluu-server/4.3/operation/services/)
15) Add a dummy entry importing this **LDIF** to ldap.
```ldif
version: 1

dn: ou=trusted-idp,o=gluu
objectClass: organizationalunit
objectClass: top
ou: trusted-idp


dn: inum=0cc08a61-aac8-413e-b5b4-da0563e61618,ou=trusted-idp,o=gluu
objectClass: oxTrustedIdp
objectClass: top
inum: 0cc08a61-aac8-413e-b5b4-da0563e61618
remoteIdpHost: dummy.idp
remoteIdpName: Dummy Idp
selectedSingleSignOnService: {"binding":"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST","location":"https://dummy.idp/idp/profile/SAML2/POST/SSO"}
signingCertificates:: WyJBREZBTEZLRlNMQUtDWEFDIT1zYWZhRkxLV1JAS0xTRkFGQUxBU8
 OHRkxBU8OHRkxGU8OHTFNBRsOHTDwjw4ckTCQhw4ckTCEjIiwiQURGQUxGS0ZTTEFLQ1hBQyE9c
 2FmYUZMS1dSQEtMU0ZBRkFMQVPDh0ZMQVPDh0ZMRlPDh0xTQUbDh0w8I8OHJEwkIcOHJEwhIyIs
 IkFERkFMRktGU0xBS0NYQUMhPXNhZmFGTEtXUkBLTFNGQUZBTEFTw4dGTEFTw4dGTEZTw4dMU0F
 Gw4dMPCPDhyRMJCHDhyRMISMiXQ==
supportedSingleSignOnServices: [{"binding":"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST","location":"https://dummy.idp/idp/profile/SAML2/POST/SSO"},{"binding":"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect","location":"https:/dummy.idp/idp/profile/SAML2/Redirect/SSO"},{"binding":"urn:mace:shibboleth:1.0:profiles:AuthnRequest","location":"https://dummy.idp/idp/profile/Shibboleth/SSO"},{"binding":"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign","location":"https://dummy.idp/idp/profile/SAML2/POST-SimpleSign/SSO"}]
```
