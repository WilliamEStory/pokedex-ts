import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";

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
    }
  };
}