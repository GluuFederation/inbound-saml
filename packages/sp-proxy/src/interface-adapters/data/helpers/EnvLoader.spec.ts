import { EnvLoader } from './EnvLoader'

describe('EnvLoader', () => {
  it('should load existing env from process.env', () => {
    process.env.testEnvLoader = 'existing env value'
    const sut = new EnvLoader()
    expect(sut.load('testEnvLoader')).toEqual('existing env value')
  })
})
