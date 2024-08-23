import { PokemonType } from "../types";

function PokemonProfile({ pokemonData }: { pokemonData: PokemonType }) {
  if (!pokemonData) return null;
  return (
    <div className="w-full h-32 flex flex-col items-center">
      <p className="capitalize text-lg font-bold">{pokemonData.name}</p>
      <img src={pokemonData?.sprites?.front_default} />
    </div>
  );
}

export default PokemonProfile;
