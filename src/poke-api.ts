import { Cache } from "./pokecache";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  #cache;

  constructor() {
    this.#cache = new Cache(5 * 60 * 1000); // 5 minutes
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const cachedResp = pageURL ? this.#cache.get(pageURL) : undefined;

    if (cachedResp) {
      return cachedResp as ShallowLocations;
    }
    
    const resp = await fetch(pageURL ?? `${PokeAPI.baseURL}/location`)

    if (!resp.ok) {
      return Promise.reject(new Error(`Failed to fetch locations: ${resp.statusText}`));
    } else {
      const data = await resp.json();
      this.#cache.add(pageURL ?? `${PokeAPI.baseURL}/location`, data);
      return data;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const cachedRResp = this.#cache.get(locationName);
    
    if (cachedRResp) {
      return cachedRResp as Location;
    }

    console.log(`${PokeAPI.baseURL}/location-area/${locationName}`);
    
    const resp = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}/`)

    if (!resp.ok) {
      return Promise.reject(new Error(`Failed to fetch location: ${resp.statusText}`));
    } else {
      const data = await resp.json();
      this.#cache.add(locationName, data);
      return data;
    }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const cachedResp = this.#cache.get(pokemonName);

    if (cachedResp) {
      return cachedResp as Pokemon;
    }

    const resp = await fetch(`${PokeAPI.baseURL}/pokemon/${pokemonName}/`)

    if (!resp.ok) {
      return Promise.reject(new Error(`Failed to fetch pokemon: ${resp.statusText}`));
    } else {
      const data = await resp.json();
      this.#cache.add(pokemonName, data);
      return data;
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}