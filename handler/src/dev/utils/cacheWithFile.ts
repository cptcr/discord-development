// /src/dev/utils/cacheWithFile.ts (advanced idea)
import fs from 'fs';
import path from 'path';

export class FileCache {
  private store: Map<string, any> = new Map();
  private filePath: string;

  constructor(fileName = 'cacheData.json') {
    this.filePath = path.join(__dirname, fileName);
    this.loadFromFile(); // Load existing data if file exists
  }

  set(key: string, value: any) {
    this.store.set(key, value);
    this.saveToFile();
  }

  get(key: string) {
    return this.store.get(key);
  }

  delete(key: string) {
    this.store.delete(key);
    this.saveToFile();
  }

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
