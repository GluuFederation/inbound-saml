export default {
  database: {
    mongo: {
      uri: process.env.MONGO_URI ?? 'mongodb://localhost',
      credentials: {
        adminLogin: process.env.MONGO_ADMIN_USER ?? 'admin',
        adminPwd: process.env.MONGO_ADMIN_PASSWORD ?? 'admin'
      },
      dbName: process.env.MONGO_DB_NAME ?? 'inbound-saml',
      collections: {
        remoteIdps:
          process.env.MONGO_DB_COLLECTIONS_REMOTEIDPS ?? 'remote-idps',
        trustRelations:
          process.env.MONGO_DB_TRUST_RELATIONS ?? 'trust-relations'
      }
    },
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
