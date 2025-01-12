/**
 * A simple in-memory cache. 
 * - Data is lost when the bot restarts.
 * - Optionally supports a time-to-live (TTL) for each entry.
 */
export default class Cache<T = any> {
    // The internal store: key -> { data, expiresAt? }
    private store = new Map<string, { data: T; expiresAt?: number }>();
  
    /**
     * Set a value in the cache.
     * @param key - The key for this item
     * @param value - The actual data you want to store
     * @param ttlSeconds - Optional time-to-live in seconds
     */
    set(key: string, value: T, ttlSeconds?: number): void {
      const record = {
        data: value,
        // If ttlSeconds is given, calculate an expiration time
        expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
      };
  
      this.store.set(key, record);
    }
  
    /**
     * Get a value from the cache.
     * - Returns undefined if not found or expired
     * @param key - The key to look up
     */
    get(key: string): T | undefined {
      const record = this.store.get(key);
      if (!record) return undefined;
  
      // If we have an expiration time, check if it's expired
      if (record.expiresAt && Date.now() > record.expiresAt) {
        // Remove expired entry
        this.store.delete(key);
        return undefined;
      }
  
      return record.data;
    }
  
    /**
     * Delete a key from the cache.
     */
    delete(key: string): void {
      this.store.delete(key);
    }
  
    /**
     * Clear all data from the cache.
     */
    clear(): void {
      this.store.clear();
    }
  }
  