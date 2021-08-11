export default {
  database: {
    ldap: {
      url: process.env.LDAP_URL ?? 'ldap://localhost',
      credentials: {
        adminLogin: process.env.LDAP_ADMIN_BIND_DN ?? 'cn=admin,dc=gluu',
        adminPwd: process.env.LDAP_ADMIN_PASSWORD ?? 'admin'
      },
      names: {
        gluuOrg: process.env.LDAP_NAMES_GLUU_ORG ?? 'dc=gluu',
        inboundSamlOu: process.env.LDAP_NAMES_INBOUND_SAML ?? 'ou=inbound-saml',
        remoteIdpsOu: process.env.LDAP_NAMES_REMOTE_IDPS ?? 'ou=remoteIdps'
      },
      objectClasses: {
        remoteIdp: process.env.LDAP_OBJECT_CLASS_REMOTE_IDP ?? 'document'
      },
      attributes: {
        remoteIdpUuid:
          process.env.LDAP_ATRIBUTE_REMOTE_IDP_UUID ?? 'documentIdentifier'
      }
    }
  }
}
