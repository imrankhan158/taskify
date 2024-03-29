import DiskCache from "./diskCache.js";
import RedisCache from "./redisCache.js";

class CacheService {
  constructor(cacheType) {
    switch (cacheType) {
      case "redis":
        this.cache = new RedisCache();
        break;
      case "disk":
        this.cache = new DiskCache();
        break;
      default:
        throw new Error(`Unsupported cache type: ${cacheType}`);
    }
  }

  async get(key) {
    return await this.cache.get(key);
  }

  async set(key, value, ttl) {
    return await this.cache.set(key, value, ttl);
  }

  async clearCache(key) {
    return await this.cache.clearCache(key);
  }
}

export default CacheService;
