import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandPokedex } from "./command_pokedex.js";

import type { CLICommand } from "./state.js";

export function getCommands(...args: string[]): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    map: {
      name: 'map',
      description: 'Displays a map of Pokémon locations',
      callback: commandMap,
    },
    mapb: {
      name: 'mapb',
      description: 'Goes back to the previous list of Pokémon locations',
      callback: commandMapb,
    },
    explore: {
      name: 'explore',
      description: 'Explore a specific location to see which Pokémon can be found there',
      callback: commandExplore,
    },
    catch:  {
      name: 'catch',
      description: 'Attempt to catch a Pokémon at your current location',
      callback: commandCatch,
    },
    inspect: {
      name: 'inspect',
      description: 'Inspect a Pokémon in your pokedex to see more details about it',
      callback: commandInspect,
    },
    pokedex: {
      name: 'pokedex',
      description: 'List all the Pokémon you have caught so far',
      callback: commandPokedex,
    } 
  };
}