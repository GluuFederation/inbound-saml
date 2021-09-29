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
})
