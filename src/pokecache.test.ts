import { expect, test } from "vitest";
import { Cache } from "./pokecache";

test.concurrent.each([
  { interval: 500, key: "test1", value: "value1" },
  { interval: 1000, key: "test2", value: { a: 1, b: 2 } },
])("Testing PokeCache with key: $key for expired cache cleanup", async ({ interval, key, value }) => {
  const cache = new Cache(interval);
  
  cache.add(key, value);

  const cachedValue = cache.get<typeof value>(key);
  expect(cachedValue).toEqual(value);

  // Wait for longer than the interval to ensure the entry is reaped
  await new Promise((resolve) => setTimeout(resolve, interval + 100));

  const expiredValue = cache.get<typeof value>(key);
  expect(expiredValue).toBeUndefined();

  cache.stopReapLoop();
});

test.concurrent.each([
  { interval: 2000, key: "persistent1", value: [1, 2, 3] },
  { interval: 3000, key: "persistent2", value: { x: 10, y: 20 } },
])("Testing PokeCache persistence with key: $key", async ({ interval, key, value }) => {
  const cache = new Cache(interval);
  
  cache.add(key, value);

  const cachedValue = cache.get<typeof value>(key);
  expect(cachedValue).toEqual(value);

  // Wait for less than the interval to ensure the entry is still present
  await new Promise((resolve) => setTimeout(resolve, interval - 500));
  
  const persistentValue = cache.get<typeof value>(key);
  expect(persistentValue).toEqual(value);
  cache.stopReapLoop();
});