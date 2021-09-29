import { generateFormInputsBlock } from "./generateFormInputsBlock"

describe('generateFormInputsBlock', () => {
  it('should return one input html line', () => {
    const inputs = [{
      name: 'valid input name',
      value: 'valid input value'
    }]
    const expected = `<input type="hidden" name="${inputs[0].name}" value="${inputs[0].value}"/>`
    expect(generateFormInputsBlock(inputs)).toEqual(expected)
  })
})