import { State } from "./state";

export async function commandExplore(state: State, ...args: string[]) {
  const locationName = args[0];
  if(!locationName) {
    console.log("Please provide a location name. Usage: explore <location-name>");
    return;
  }
  
  console.log(`Exploring location: ${locationName}...`);
  const location = await state.PokeAPI.fetchLocation(locationName);

  console.log("Found Pokemon:");

  location.pokemon_encounters.forEach(encounter => {
    console.log(`- ${encounter.pokemon.name}`);
  })
}