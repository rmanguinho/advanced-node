export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '255017709763229',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'c02b1e197ee6aec2947b193148cdaef7'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? '3jk24h32jk4h'
}
