interface IFormInput {
  name: string
  value: string
}
/**
 * Generate form inputs block as string, to be used by generatePostProfileForm
 * @param formInputs 
 * @returns 
 */
export const generateFormInputsBlock = (formInputs: IFormInput[]): string => {
  const formInputString = `<input type="hidden" name="${formInputs[0].name}" value="${formInputs[0].value}"/>`
  return formInputString
}

