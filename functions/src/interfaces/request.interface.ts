export interface GenerateGameRequest {
  size: number,
  mines: number,
}

export interface LogRequest {
  level: 'warn' | 'error' | 'info',
  message: string,
  data? : any
}
