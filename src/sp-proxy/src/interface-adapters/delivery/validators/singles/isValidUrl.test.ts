import { isValidUrl } from '@sp-proxy/interface-adapters/delivery/validators/singles/isValidUrl'

describe('singles/isValidUrl - integration', () => {
  it('should return true with valid url', async () => {
    const validUrl = 'https://validhost.com/valid-path/validFile.ext'
    expect(await isValidUrl(validUrl)).toBeTruthy()
  })
})
