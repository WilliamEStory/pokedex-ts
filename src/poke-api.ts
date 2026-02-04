export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const resp = await fetch(pageURL ?? `${PokeAPI.baseURL}/location`)

    if (!resp.ok) {
      return Promise.reject(new Error(`Failed to fetch locations: ${resp.statusText}`));
    } else {
      const data = await resp.json();
      return data;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const resp = await fetch(`${PokeAPI.baseURL}/location/${locationName}`)

    if (!resp.ok) {
      return Promise.reject(new Error(`Failed to fetch location: ${resp.statusText}`));
    } else {
      const data = await resp.json();
      return data
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string,
    url: string;
  }[]
};

export type Location = {
  id: number;
  name: string;
};