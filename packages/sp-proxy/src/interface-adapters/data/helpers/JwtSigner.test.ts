import { randomUUID } from 'crypto'
import { decode } from 'jsonwebtoken'
import { IJwtHeader } from '../protocols/IJwtHeader'
import { IJwtPayload } from '../protocols/IJwtPayload'
import { JwtSigner } from './JwtSigner'

interface UmaRpSettings {
  clientId: string
  kid: string
  tokenEndpoint: string
}

const validPrivateKey =
  '-----BEGIN PRIVATE KEY-----\n' +
  'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQClszOoF71vHMPp\n' +
  'SsqAKSpT/y/gnFwChsgLJ0rHLq02uoSyYtuHX8g793rg69IJ0FwmRM+Ube1xyfh0\n' +
  'raF/pTG5SXoX2sp9UiPwcTUH9qg87mMeg1BDQbhIGaAeFVtt5alOx9MRS1W4ivZ8\n' +
  'iAYWnhuGQ+Tw7TcjXdJkUogeKkz+GPEHE74je6CrKk3Jj+dKJ1c3PKycmN+J26Ji\n' +
  't8dH//AONSEFKAGb8W0NMNIPSEKEAP35dzwU4DiIe6BxmAYVmMHwJ8XPYeyCnl85\n' +
  'KuMwo0DesM04RN2IJ7r1pTfA2E7WHM8Fn6w1jZxzCIaSxpjyj3iKauWvKWdnaAHN\n' +
  'kIaIYoBHAgMBAAECggEAMP2NMc8nDoF6OPEIcyD4p1IFJUsFdyfDYGzTEpXt14cI\n' +
  '8bcBwgIjMPuoJHUEqisk+5mPqApiUCjPYSvu2k8MpwQe6YuiH7BX+OB3te2K60zu\n' +
  'GFjps6DsK8EL0qks2Y6z4pt4/51+8CuB2erbpfdEGwva1hLEoRu9tzShkw2dquhZ\n' +
  '68b+iZTlwd7gVtbS0hehzr6GSaCDUIxg4BNfFKm47k6p+zrL3phZeUR0WfrLFOhb\n' +
  'YiVIW3xu5eCsy7w7FHFJPSub91NVcpC333QQ7rIQD3r67xj5GKDpGP7vZJig5kN6\n' +
  'Nc2+cTjTBIXNbcIcx92ny2ZdVC01YmAeVQW5zCXV4QKBgQDZ3UdQ87DqE/uA9htV\n' +
  'lEq2Mqs9uWzD+KPkzPrd3am6Fkzx6o3U41N2YBMllCleMxARSLif+N/MJZ8s0QIm\n' +
  '03qLH0Iiq1lMxNcjxN1Znhz+pUt9IDySRi52jqi7/tO8X/dR9LpHfJwO4PmbmFDQ\n' +
  'hxcjobZypY53KSqi0pR+EnEuoQKBgQDCtGK74dsXbGoIZUC+U/nDMthNH1eCbXNc\n' +
  'NRVKY99FBd7kaXXVh+HTU4ihA47PE0754edeUFmSc70EsDVIUR2C8YTnmVaH5SyD\n' +
  '7QHmoHTZQVeX7QQH1Fx6lC8FNQ9dxHERRDzwUCFUos6EaDlOE/0JSkJhruRXxTL1\n' +
  'EnYUhltN5wKBgB4a1Z/6DJhL6pUHbP+GXkyO89qzpLPvx7X2HTRLTQjJzBghsTeZ\n' +
  'sg7Jd9vZfV3m8HFy+xAf88zh5fzrZMC4uFZBG4Ju6wgQqynmKjAYCSmm7ad8rOIJ\n' +
  'kKIRVH+l1txQ5nwMtTDrpyTnMZaulXw7Lpdd4Tg2aFlO9vVI4/wH0FwBAoGAe4A0\n' +
  'CHzQneD0uPKQyKk3ietcbD7vIRoPzHMXWCJVYtDAex2x0onoYkVgKtG46fyTYck7\n' +
  'GwXYax7izHCAu6hIEeDkrosC6hwhymSxifpJY+0ghIugvN6k8lPAJ4tqfc228n7Y\n' +
  'MI6DNc43NKFvh+kB3byusote55V8JxtYrtgyXg0CgYBRhUv4DcEjV1BHw8rF7s32\n' +
  '0gbDcsuGcrMpQlNavyDmDd8CL+FXdFoMnVRwojpK15d2ZCNAt4sF9IVHy546e5gm\n' +
  '69cATBdiaX2Kc+L7lNYKSmf6gW7ksCCNRbXVG8hxgIgopZ6lzFNSbn0X0CRyG3T8\n' +
  'V75fuBawaYf87RAY9XNJGA==\n' +
  '-----END PRIVATE KEY----- '

const fakeSettings: UmaRpSettings = {
  clientId: 'valid client id',
  kid: 'valid kid',
  tokenEndpoint: 'valid token endpoint'
}

describe('JwtSigner', () => {
  const sut = new JwtSigner()
  describe('sign', () => {
    it('should return the signed JWT', () => {
      const now = new Date().getTime()
      const exp = Math.floor(now / 1000 + 30)
      const iss = fakeSettings.clientId
      const sub = fakeSettings.clientId
      const iat = now
      const jti = randomUUID()
      const aud = fakeSettings.tokenEndpoint
      const payload: IJwtPayload = {
        iss,
        sub,
        iat,
        exp,
        jti,
        aud
      }
      const kid = fakeSettings.kid
      const alg = 'RS256'
      const TYP = 'JWT'
      const header: IJwtHeader = {
        TYP,
        alg,
        kid
      }
      const signed = sut.sign(header, payload, validPrivateKey)
      const decoded = decode(signed)
      console.log(decoded)
    })
  })
})
