/**
 * Validator for I-A layer
 */
export interface IValidator {
  isValid: (arg: any) => Promise<boolean>
}
