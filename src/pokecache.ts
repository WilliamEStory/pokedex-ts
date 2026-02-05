type CacheEntry<T> = {
  createdAt: number;
  data: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  #reap() {
    this.#cache.forEach((entry, key) => {
      if (Date.now() - entry.createdAt > this.#interval) {
        this.#cache.delete(key);
      }
    })
  }

  #startReapLoop() {
    if (this.#reapIntervalId) return;
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }

  add<T>(key: string, val: T) {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      data: val
    };
    this.#cache.set(key, entry);
  }

  get<T>(key: string): T | undefined {
    const entry = this.#cache.get(key);
    if (!entry) return undefined;
    return entry.data as T;
  }
}