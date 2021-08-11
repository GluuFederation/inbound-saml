import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { ICreateRemoteIdpGateway } from '@sp-proxy/use-cases/ports/ICreateRemoteIdpGateway'
import * as ldap from 'ldapjs'

export class LdapCreateRemoteIdp implements ICreateRemoteIdpGateway {
  /**
   * @param client
   * @param dn - the complete dn (i.e.: ou=remoteIdps,ou=inbound-saml,o=gluu)
   * @param rdnAttribute - the unique identifier attribute
   */
  constructor(
    private readonly client: ldap.Client,
    private readonly dn: string,
    private readonly rdnAttribute: string
  ) {}

  /**
   * Create entity in persistence
   * @param remoteIdp - entity instance
   * @returns true if sucessfully created
   */
  async create(remoteIdp: RemoteIdp): Promise<boolean> {
    const rdn = `${this.rdnAttribute}=${remoteIdp.id}`
    const name = `${rdn},${this.dn}`
    this.client.add(name, remoteIdp.props, (err) => {
      throw new PersistenceError(
        `${err.name.toString()}: ${err.message.toString()}`
      )
    })
    return true
  }
}
