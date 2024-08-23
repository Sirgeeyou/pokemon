export async function getPokemonByName({ name }: { name: string }) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function getPokemonById({ id }: { id: number }) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function getMatchingPokemon(name: string) {
  // Replace this with your actual API call
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
  );
  const data = await response.json();
  return data.results.filter((pokemon: any) =>
    pokemon.name.toLowerCase().includes(name.toLowerCase())
  );
}
