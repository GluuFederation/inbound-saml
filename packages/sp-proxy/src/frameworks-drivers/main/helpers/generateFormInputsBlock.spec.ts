import { generateFormInputsBlock } from '@sp-proxy/frameworks-drivers/main/helpers/generateFormInputsBlock'
import faker from 'faker'
import { IFormInput } from '@sp-proxy/frameworks-drivers/main/protocols/IFormInput'

const getLineCount = (str: string): number => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const lineCount = (str.match(/\n/g) ?? '').length + 1
  return lineCount
}

const generateFakeInputs = (count?: number): IFormInput[] => {
  // between 1 and 10 inputs
  const formInputs: IFormInput[] = []
  let inputCounts: number
  if (count != null) {
    inputCounts = count
  } else {
    // defaults to between 1 and 10 inputs
    inputCounts = Math.random() * (10 - 1) + 1
  }
  for (let i = 0; i < inputCounts; i++) {
    const input = {
      name: faker.lorem.words(),
      value: faker.lorem.words()
    }
    formInputs.push(input)
  }
  return formInputs
}

describe('generateFormInputsBlock', () => {
  it('should return one input html line', () => {
    const inputs = [
      {
        name: 'valid input name',
        value: 'valid input value'
      }
    ]
    const expected = `<input type="hidden" name="${inputs[0].name}" value="${inputs[0].value}"/>`
    const res = generateFormInputsBlock(inputs)
    expect(getLineCount(res)).toEqual(1)
    expect(res).toEqual(expected)
  })
  it('should return three lines', () => {
    const threeInputs = generateFakeInputs(3)
    const res = generateFormInputsBlock(threeInputs)
    expect(getLineCount(res)).toEqual(3)
  })
  it('should return one line per object', () => {
    const randomFakeInputs = generateFakeInputs()
    const fakeInputsCount = randomFakeInputs.length

    const res = generateFormInputsBlock(randomFakeInputs)
    expect(getLineCount(res)).toEqual(fakeInputsCount)
  })
})
