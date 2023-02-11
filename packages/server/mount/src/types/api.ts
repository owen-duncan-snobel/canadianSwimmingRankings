export interface ApiResponse {
  status: 'SUCCESS' | 'ERROR',
  message: string,
  results: any
}