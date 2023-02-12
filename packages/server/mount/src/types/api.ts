export type Status = 'SUCCESS' | 'ERROR'
export interface ApiResponse {
  status: Status,
  message: string,
  results: any
}

export interface ResponseError extends Error {
  status?: Status
  statusCode?: number
}