export interface IValidator {
  isValid: (arg: any) => Promise<boolean>
}
