const redis = require("redis");

const client = redis.createClient({
  url: "redis://localhost:6379",
});

client.on("error", (err) => {
  console.error("Redis client error:", err);
});

client.on("connect", () => {
  console.log("Connected to Redis.....");
});

(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
})();

module.exports = client;
