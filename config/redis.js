const redis = require("redis");

const MAX_RETRIES = 5;
let retryCount = 0;

const redisUrl = process.env.REDIS_URL ;
const client = redis.createClient({ url: redisUrl });

client.on("error", (err) => {
  console.error("❌ Redis client error:", err.message);
});

client.on("connect", () => {
  console.log("✅ Connected to Redis");
});

const connectToRedis = async () => {
  try {
    await client.connect();
    retryCount = 0; 
  } catch (error) {
    retryCount++;
    console.error(`❌ Redis connection failed (Attempt ${retryCount}/${MAX_RETRIES}): ${error.message}`);

    if (retryCount >= MAX_RETRIES) {
      console.error("💥 Max Redis connection retries reached. Exiting process.");
      process.exit(1);
    }

    const delay = Math.min(5000 * retryCount, 30000);
    console.log(`🔁 Retrying Redis connection in ${delay / 1000} seconds...`);
    setTimeout(connectToRedis, delay);
  }
};

module.exports = {
  client,
  connectToRedis,
};
