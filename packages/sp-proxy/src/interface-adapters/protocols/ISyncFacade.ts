export interface ISyncFacade<ReqProps, ResProps> {
  do: (request: ReqProps) => Promise<ResProps>
}
