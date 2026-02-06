import { State } from "./state";

export async function commandPokedex(state: State) {
  if(Object.keys(state.pokedex).length === 0) {
    console.log("Your pokedex is empty. Go catch some Pokémon!");
    return;
  }

  console.log("Your Pokedex:");
  for (const pokemonName in state.pokedex) {
    const pokemon = state.pokedex[pokemonName];
    console.log(`- ${pokemon.name}`);
  }
}