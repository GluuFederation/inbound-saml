import * as inputsBlock from './generateFormInputsBlock'
import { generatePostProfileForm } from './generatePostProfileForm'

describe('generatePostProfileForm', () => {
  it('should call generateFormInputsBlock with formInputs', () => {
    const generateFormInputsBlockSpy = jest.spyOn(
      inputsBlock,
      'generateFormInputsBlock'
    )
    generatePostProfileForm('', 'formInputs' as any)
    expect(generateFormInputsBlockSpy).toHaveBeenCalledTimes(1)
    expect(generateFormInputsBlockSpy).toHaveBeenCalledWith('formInputs')
  })
  it('should contain post to postProfileUrl action', () => {
    const validUrl = 'valid postProfileUrl'
    const res = generatePostProfileForm(validUrl, '' as any)
    const postAction = `<form action="${validUrl}" method="post">`
    expect(res).toContain(postAction)
  })
  it('should start with propper html', () => {
    const html = '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">'
    const body = '<body onload="document.forms[0].submit()">'
    const noScript = '<noscript>'
    const res = generatePostProfileForm('', '' as any)
    expect(res).toContain(html)
    expect(res).toContain(body)
    expect(res).toContain(noScript)
  })
  it('should contain generated formInputsBlock', () => {
    jest
      .spyOn(inputsBlock, 'generateFormInputsBlock')
      .mockReturnValue('a lot of valid \n input \n blocks')
    const res = generatePostProfileForm('', '' as any)
    expect(res).toContain('a lot of valid \n input \n blocks')
  })
  it('should return expected auto submit form', () => {
    const postProfileUrl = 'https://valid.post.url/path'
    const inputs = [
      {
        name: 'user',
        value: 'any valid uservalue'
      },
      {
        name: 'time',
        value: 'any valid time value'
      }
    ]

    const block = inputsBlock.generateFormInputsBlock(inputs)
    const expectedForm = `
  <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
  <body onload="document.forms[0].submit()">
    <noscript>
      <p>
        <b>Note:</b> your browser does not support JavaScript, please press the Continue
        button to proceed.
      </p>
    </noscript>

    <form action="${postProfileUrl}" method="post">
      <div> 
        ${block}
            <noscript>
              <input type="submit" value="Continue"/>
            </noscript>
      </div>
      </form>
    </body>
  </html>
  `
    const res = generatePostProfileForm(postProfileUrl, inputs)
    expect(res).toEqual(expectedForm)
  })
})
