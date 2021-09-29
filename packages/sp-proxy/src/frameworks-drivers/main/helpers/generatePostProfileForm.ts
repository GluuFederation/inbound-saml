import { IFormInput } from '@sp-proxy/frameworks-drivers/main/protocols/IFormInput'
import { generateFormInputsBlock } from '@sp-proxy/frameworks-drivers/main/helpers/generateFormInputsBlock'

// TODO: move to inner layer when authenticate is moved
export const generatePostProfileForm = (
  postProfileUrl: string,
  formInputs: IFormInput[]
): string => {
  generateFormInputsBlock(formInputs)
  // TODO: move template to persistence
  return ''
}
