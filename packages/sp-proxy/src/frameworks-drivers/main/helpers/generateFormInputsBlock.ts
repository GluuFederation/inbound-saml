import { IFormInput } from '@sp-proxy/frameworks-drivers/main/protocols/IFormInput'

/**
 * Generate form inputs block as string, to be used by generatePostProfileForm
 * @param formInputs
 * @returns
 */
export const generateFormInputsBlock = (formInputs: IFormInput[]): string => {
  let formInputsBlock: string = ''
  for (const formInput of formInputs) {
    const line = `<input type="hidden" name="${
      formInput.name
    }" value=${encodeURIComponent(formInput.value)}>`
    if (formInputsBlock === '') {
      formInputsBlock = line
    } else {
      formInputsBlock += `\n${line}`
    }
  }
  return formInputsBlock
}
