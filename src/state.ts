import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands";
import { PokeAPI, type Location, type ShallowLocations } from "./poke-api";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  nextLocationsURL: string;
  prevLocationsURL: string;
  PokeAPI: {
    fetchLocations: (pageURL?: string) => Promise<ShallowLocations>;
    fetchLocation: (locationName: string) => Promise<Location>;
  }
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  
  const pokeAPI = new PokeAPI();

  return {
    readline: rl,
    commands: getCommands(),
    nextLocationsURL: "",
    prevLocationsURL: "",
    PokeAPI: pokeAPI,
  };
}