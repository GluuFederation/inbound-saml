import cfg from './env'

describe('PersistenceConfig', () => {
  describe('defaults', () => {
    it('should return default completePath', () => {
      const expectedDefaultValue = 'identity/restv1/api/v1/inbound-saml'
      expect(cfg.oxTrustApi.completePath).toEqual(expectedDefaultValue)
    })
  })
})
