import { useState } from "react";
import { Input } from "./ui/input";
import { getMatchingPokemon } from "../services/apiPokemon";
import { PokemonType } from "../types";
import Spinner from "./Spinner";

function SearchPokemon() {
  const [pokemonName, setPokemonName] = useState<string>("");
  const [results, setResults] = useState<PokemonType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.value;
    setPokemonName(name);

    if (name.length > 2) {
      setIsLoading(true);
      try {
        const response = await getMatchingPokemon(name);
        if (response) {
          setResults(response);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="border rounded-md w-[400px] h-[400px]  overflow-auto">
      <Input
        value={pokemonName}
        onChange={handleInputChange}
        placeholder="Search for a Pokémon..."
        type="text"
      />

      <div className="mt-4">
        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : results.length > 0 ? (
          <ul className="">
            {results?.map((pokemon) => (
              <li key={pokemon.id} className="p-2 border-b">
                {pokemon.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">Please enter a Pokémon name</p>
        )}
      </div>
    </div>
  );
}

export default SearchPokemon;
