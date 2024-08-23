// usePokemonQueryId.ts
import { useQuery } from "@tanstack/react-query";
import { getPokemonById } from "../services/apiPokemon"; // Make sure to implement this API function

export function usePokemonQueryId({ id }: { id: number | null }) {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => {
      if (id !== null) {
        return getPokemonById({ id });
      }
    },
    enabled: id !== null, // Only enable the query if id is not null
  });
}
