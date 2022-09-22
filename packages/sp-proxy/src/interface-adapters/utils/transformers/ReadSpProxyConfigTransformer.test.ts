import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
import { KeyCertLoader } from '@sp-proxy/interface-adapters/external-services/KeyCertLoader'
import { ReadSpProxyConfigFormatter } from '@sp-proxy/interface-adapters/utils/formatters/ReadSpProxyConfigFormatter'
import { ReadSpProxyConfigTransformer } from '@sp-proxy/interface-adapters/utils/transformers/ReadSpProxyConfigTransformer'
import { IKeyCertLoader } from '@sp-proxy/use-cases/protocols/IKeyCertLoader'
import { IKeyCertFormatter } from '@sp-proxy/use-cases/protocols/IKeySetFormatter'
import { readFileSync } from 'fs'

const spProxyConfigProps: SpProxyConfigProps = {
  host: 'fake stubbed host',
  requestedIdentifierFormat: 'fake stubbed identifier format',
  authnContextIdentifierFormat: 'fake stubbed authn context identifier format',
  skipRequestCompression: true,
  decryption: {
    privateKeyPath: process.cwd() + '/packages/testdata/key.pem',
    publicCertPath: process.cwd() + '/packages/testdata/cert.pem'
  },
  postProfileUrl: 'fake stubbed postProfileUrl'
}

const fakeSpProxyConfig = new SpProxyConfig(spProxyConfigProps)

const optionalSigning = {
  signing: {
    privateKeyPath: process.cwd() + '/packages/testdata/key.pem',
    publicCertPath: process.cwd() + '/packages/testdata/cert.pem'
  }
}
const propsCopy = Object.assign({}, spProxyConfigProps)
const spConfigPropsWithSigning: SpProxyConfigProps = Object.assign(
  propsCopy,
  optionalSigning
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fakeSpProxyConfigWithSigning = new SpProxyConfig(spConfigPropsWithSigning)

const makeLoader = (): IKeyCertLoader => new KeyCertLoader()
const makeFormatter = (): IKeyCertFormatter => new ReadSpProxyConfigFormatter()
const sut = new ReadSpProxyConfigTransformer(makeLoader(), makeFormatter())

interface KeyCertType {
  publicCert: string
  privateKey: string
}

const signingPairPaths = (): KeyCertType => {
  const privateKey = fakeSpProxyConfigWithSigning.props.signing?.privateKeyPath
  const publicCert = fakeSpProxyConfigWithSigning.props.signing?.publicCertPath
  if (typeof privateKey === 'string' && typeof publicCert === 'string') {
    return {
      publicCert,
      privateKey
    }
  } else {
    // force test to fail
    expect(typeof privateKey).toEqual('string')
    throw new Error('Test error')
  }
}

describe('ReadSpProxyTransformer', () => {
  describe('transform SpProxyConfig in Response Model ReadSpProxyConfigUseCaseParams', () => {
    it('should transform correctly WITHOUT optional signing key/cert', async () => {
      const expected = {
        authnContextIdentifierFormat:
          'fake stubbed authn context identifier format',
        decryption: {
          cert: readFileSync(
            fakeSpProxyConfig.props.decryption.publicCertPath
          ).toString(),
          privateKey: readFileSync(
            fakeSpProxyConfig.props.decryption.privateKeyPath
          ).toString()
        },
        host: 'fake stubbed host',
        requestedIdentifierFormat: 'fake stubbed identifier format',
        skipRequestCompression: true,
        postProfileUrl: 'fake stubbed postProfileUrl'
      }
      expect(await sut.transform(fakeSpProxyConfig)).toStrictEqual(expected)
    })
    it('should transform correctly WITH optional signing key/cert', async () => {
      const expected = {
        authnContextIdentifierFormat:
          'fake stubbed authn context identifier format',
        decryption: {
          cert: readFileSync(
            fakeSpProxyConfig.props.decryption.publicCertPath
          ).toString(),
          privateKey: readFileSync(
            fakeSpProxyConfig.props.decryption.privateKeyPath
          ).toString()
        },
        signing: {
          cert: readFileSync(signingPairPaths().publicCert).toString(),
          privateKey: readFileSync(signingPairPaths().privateKey).toString()
        },
        host: 'fake stubbed host',
        requestedIdentifierFormat: 'fake stubbed identifier format',
        skipRequestCompression: true,
        postProfileUrl: 'fake stubbed postProfileUrl'
      }
      expect(await sut.transform(fakeSpProxyConfigWithSigning)).toStrictEqual(
        expected
      )
    })
  })
})
