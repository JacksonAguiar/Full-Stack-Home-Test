import redis from "ioredis";

let instance;

try {
    
    new redis({
        host: "redis-12806.c322.us-east-1-2.ec2.cloud.redislabs.com",
        port: 12806,
        password: "RgaaMcSM1Wq35b0DNtJcP76vJMxi3uyc",
        
    })
} catch (error) {
 
    console.log("could not connect to redis");
    instance = null;
}
    
export default instance;