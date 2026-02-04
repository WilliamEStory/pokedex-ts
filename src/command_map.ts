import { State } from "./state";

export async function commandMap(state: State): Promise<void> {
  const locations = await state.PokeAPI.fetchLocations(state.nextLocationsURL || undefined);

  const { results } = locations;

  if (results.length === 0) {
    console.log("No locations found.");
    return;
  } else {
    state.nextLocationsURL = locations.next || "";
    state.prevLocationsURL = locations.previous || "";
    results.forEach((location) => {
      const locationName = location.name;
      const locationURL = location.url;

      console.log(`Location: ${locationName}`);
      console.log(`URL: ${locationURL}`);
      console.log("-----------------------------");
    });
  }
}