export type Payload = {
  sub: number
  username: string
  iat: number
  exp: number
}

export type RequestContext = {
  user: Payload
}
