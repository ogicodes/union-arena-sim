import 'dotenv/config'
import { server } from './api'

const PORT = process.env.API_PORT || 1234

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
