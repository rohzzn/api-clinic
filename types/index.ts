export interface RequestData {
  method: string
  url: string
  headers: Record<string, string>
  body?: string
  response?: ResponseData
}

export interface ResponseData {
  status: number
  statusText: string
  headers: Record<string, string>
  data: any
}

