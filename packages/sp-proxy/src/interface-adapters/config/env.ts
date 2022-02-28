import { IOxTrustApiSettings } from '../data/protocols/IOxTrustApiSettings'

const getConfigFilePath = (): any => {
  if (process.env.NODE_ENV === 'test') {
    return (
      process.cwd() +
      '/packages/sp-proxy/src/frameworks-drivers/file-persistence/sp-proxy-config-test.json'
    )
  } else if (process.env.NODE_ENV === 'dev') {
    return (
      process.cwd() +
      '/packages/sp-proxy/src/frameworks-drivers/file-persistence/sp-proxy-config-dev.json'
    )
  }
}

const oxTrustApiSettings: IOxTrustApiSettings = {
  host: process.env.INBOUND_SAML_OXTRUST_API_HOST ?? 'myhosta.com',
  clientId: process.env.INBOUND_SAML_OXTRUST_CLIENT_ID ?? 'valid client id',
  completePath:
    process.env.INBOUND_SAML_OXTRUST_API_COMPLETE_PATH ??
    'identity/restv1/api/v1',
  tokenUrl: process.env.INBOUND_SAML_OXTRUST_API_TOKEN_URL ?? 'valid token url',
  kid: process.env.INBOUND_SAML_OXTRUST_API_KID ?? 'valid pvk kid',
  pvkPath: process.env.INBOUND_SAML_OXTRUST_API_PVK_PATH ?? 'valid path'
}

export default {
  oxTrustApi: oxTrustApiSettings,
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
    },
    file: {
      proxyConfigPath: process.env.PROXY_CFG_PATH ?? getConfigFilePath()
    }
  }
}
