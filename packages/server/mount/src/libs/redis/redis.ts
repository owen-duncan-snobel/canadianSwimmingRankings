import * as redis from 'redis'

const REDIS_URL = process.env.REDIS_URL
const REDIS_PASSWORD = process.env.REDIS_PASSWORD

const client = redis.createClient({
  url : REDIS_URL,
  password: REDIS_PASSWORD
})

client.connect()

client.on("error", (err) => {
  console.log('Error connecting to redis: ', err)
})

export default client