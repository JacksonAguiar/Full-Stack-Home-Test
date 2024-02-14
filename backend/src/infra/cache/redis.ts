import redis from "ioredis";
import 'dotenv/config'

let instance: redis;

try {
   instance = new redis(process.env.REDIS_URL)
} catch (error) {
 
    console.log("could not connect to redis");
    instance = null;
}
    
export default instance;