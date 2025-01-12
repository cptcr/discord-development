// /src/dev/utils/cacheWithFile.ts (advanced idea)
import fs from 'fs';
import path from 'path';


export class FileCache {
  private store: Map<string, any> = new Map();
  private filePath: string;

  /**
   * The constructor of the FileCache class. This is where the cache is initialized and the keys/values will be stored.
   * @param {string | "database.json"} fileName - The name of the json file to store the cache.
   */
  constructor(fileName = 'cacheData.json') {
    this.filePath = path.join(__dirname, fileName);
    this.loadFromFile(); // Load existing data if file exists
  }

  /**
   * Set a value in the cache.
   * @param key - The key to store the value under.
   * @param value - The value to store.
   */
  set(key: string, value: any) {
    this.store.set(key, value);
    this.saveToFile();
  }

  /**
   * Gets the value associated with the given key.
   * @param {string} key - The key to retrieve the value for.
   * @returns - The value associated with the given key if it exists in the cache, otherwise undefined.
   */
  get(key: string) {
    return this.store.get(key);
  }

  /**
   * Removes the value associated with the given key from the cache.
   * @param {string} key - The key to delete
   */
  delete(key: string) {
    this.store.delete(key);
    this.saveToFile();
  }

  /**
   * Clears the entire cache.
   */
  clear() {
    this.store.clear();
    this.saveToFile();
  }

  private saveToFile() {
    // Write the entire Map to a JSON file
    const obj: Record<string, any> = {};
    for (const [key, val] of this.store.entries()) {
      obj[key] = val;
    }
    fs.writeFileSync(this.filePath, JSON.stringify(obj, null, 2));
  }

  private loadFromFile() {
    if (fs.existsSync(this.filePath)) {
      const rawData = fs.readFileSync(this.filePath, 'utf-8');
      const obj = JSON.parse(rawData);
      for (const key in obj) {
        this.store.set(key, obj[key]);
      }
    }
  }
}
