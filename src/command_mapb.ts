import { State } from "./state";

export async function commandMapb(state: State) {
  if (!state.prevLocationsURL) {
    throw new Error("you're on the first page");
  }

  const locations = await state.PokeAPI.fetchLocations(state.prevLocationsURL);

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  for (const loc of locations.results) {
    console.log(loc.name+"-area");
  }
}