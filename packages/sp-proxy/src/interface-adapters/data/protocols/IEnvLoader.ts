export interface IEnvLoader {
  load: (environmentVariable: string) => string | undefined
}
