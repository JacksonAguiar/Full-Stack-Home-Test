import redis from "ioredis";

let instance;

try {
   instance = new redis(process.env.REDIS_URL)
} catch (error) {
 
    console.log("could not connect to redis");
    instance = null;
}
    
export default instance;