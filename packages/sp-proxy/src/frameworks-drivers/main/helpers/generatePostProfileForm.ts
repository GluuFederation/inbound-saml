import { IFormInput } from '@sp-proxy/frameworks-drivers/main/protocols/IFormInput'
import { generateFormInputsBlock } from '@sp-proxy/frameworks-drivers/main/helpers/generateFormInputsBlock'

// TODO: move to inner layer when authenticate is moved
export const generatePostProfileForm = (
  postProfileUrl: string,
  formInputs: IFormInput[]
): string => {
  const inputsBlock = generateFormInputsBlock(formInputs)
  // TODO: move template to persistence
  return `
  <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
  <body onload="document.forms[0].submit()">
    <noscript>
      <p>
        <b>Note:</b> your browser does not support JavaScript, please press the Continue
        button to proceed.
      </p>
    </noscript>

    <form action=${postProfileUrl} method="post">
      <div> 
        ${inputsBlock}
            <noscript>
              <input type="submit" value="Continue"/>
            </noscript>
      </div>
      </form>
    </body>
  </html>
  `
}
