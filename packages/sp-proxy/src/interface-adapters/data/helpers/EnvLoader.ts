import { IEnvLoader } from '../protocols/IEnvLoader'

export class EnvLoader implements IEnvLoader {
  load(environmentVariable: string): string | undefined {
    return process.env[environmentVariable]
  }
}
