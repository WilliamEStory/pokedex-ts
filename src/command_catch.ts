import { State } from "./state";

export async function commandCatch(state: State, ...args: string[]) {
  const pokemonName = args[0];
  if (!pokemonName) {
    console.log("Please provide a Pokémon name. Usage: catch <pokemon-name>");
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);
  const pokemon = await state.PokeAPI.fetchPokemon(pokemonName);

  const catchChannce = Math.random() * 100 + pokemon.base_experience / 10;

  if (catchChannce > 50) {
    console.log(`${pokemon.name} was caught!`);
    state.pokedex[pokemon.name] = pokemon;
  } else {
    console.log(`${pokemon.name} escaped!`);
  }
}