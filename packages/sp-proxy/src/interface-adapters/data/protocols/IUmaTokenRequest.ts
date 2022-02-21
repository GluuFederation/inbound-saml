export interface IUmaTokenRequest {
  grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket'
  ticket: string
  client_id: string
  client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
  scope: 'oxtrust-api-read oxtrust-api-write'
}
