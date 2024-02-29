import Redis from "ioredis";

class RedisCache {
  constructor() {
    this.redisClient = new Redis(process.env.REDIS_URL);
  }

  async get(key) {
    return await this.redisClient.get(key);
  }

  async set(key, value, ttl) {
    if (ttl) {
      return await this.redisClient.set(key, value, "EX", ttl);
    } else {
      return await this.redisClient.set(key, value);
    }
  }

  async clearCache(key) {
    return await this.redisClient.del(key);
  }
}

export default RedisCache;
