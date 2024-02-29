class DiskCache {
  constructor() {}

  async get(key) {
    throw new Error("Method not implemented.");
  }

  async set(key, value, ttl) {
    throw new Error("Method not implemented.");
  }

  async clearCache(key) {
    throw new Error("Method not implemented.");
  }
}

export default DiskCache;
