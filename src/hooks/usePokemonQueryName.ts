import { getPokemonByName } from "../services/apiPokemon";
import { useQuery } from "@tanstack/react-query";

export function usePokemonQueryName({ name }: { name: string }) {
  return useQuery({
    queryKey: ["pokemonId", name],
    queryFn: () => getPokemonByName({ name }),
    enabled: false,
  });
}
