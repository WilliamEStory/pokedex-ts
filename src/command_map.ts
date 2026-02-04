import { State } from "./state";

export async function commandMap(state: State) {
  const locations = await state.PokeAPI.fetchLocations(state.nextLocationsURL || undefined);

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  for (const loc of locations.results) {
    console.log(loc.name+"-area");
  }
}