import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import PokemonProfile from "./PokemonProfile";
import { Button } from "./ui/button";
import SearchPokemon from "./SearchPokemon";
import { usePokemonQueryId } from "../hooks/usePokemonQueryId";
import { usePokemonQueryName } from "../hooks/usePokemonQueryName";
import Spinner from "./Spinner";

export default function EnterPokemon() {
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonId, setPokemonId] = useState<number | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  const {
    isLoading: isLoadingByName,
    data: pokemonByName,
    error: errorByName,
    refetch: refetchByName,
  } = usePokemonQueryName({
    name: pokemonName,
  });

  const {
    isLoading: isLoadingById,
    data: pokemonById,
    error: errorById,
  } = usePokemonQueryId({
    id: pokemonId,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(e.target.value);
    setNameError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pokemonName.trim() === "") {
      setNameError("Pokémon name is required");
      return;
    }
    const res = await refetchByName();

    if (res.data) {
      setPokemonId(res.data.id);
    } else {
      setNameError("Sorry, no Pokémon found");
    }
  };

  const handleNext = () => {
    if (pokemonId !== null) {
      setPokemonId(pokemonId + 1);
      setPokemonName("");
    }
  };

  const handlePrevious = () => {
    if (pokemonId !== null && pokemonId > 1) {
      setPokemonId(pokemonId - 1);
      setPokemonName("");
    }
  };

  useEffect(() => {
    if (pokemonByName && pokemonByName.id) {
      setPokemonId(pokemonByName.id);
    }
  }, [pokemonByName]);

  const shouldDisplayProfileByName =
    !isLoadingById && pokemonByName && !pokemonById;
  const shouldDisplayProfileById = !isLoadingByName && pokemonById;

  return (
    <div className="w-full min-h-screen flex">
      <div className="flex items-center gap-10 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="border rounded-md p-4 w-[400px] h-[400px] flex flex-col gap-3"
        >
          <div>
            <Label
              htmlFor="pokemonName"
              className="text-muted-foreground dark:text-muted-foreground"
            >
              Enter a Pokémon name...
            </Label>
            <Input
              id="pokemonName"
              value={pokemonName}
              onChange={handleInputChange}
              placeholder="Enter a Pokémon name..."
              type="text"
            />
            {nameError && <span>{nameError}</span>}
          </div>
          <Button type="submit">Search</Button>

          {isLoadingByName ||
            (isLoadingById && (
              <div className="flex justify-center align-middle my-auto">
                <Spinner />
              </div>
            ))}
          {errorByName ||
            (errorById && <div>Sorry, we could not find your Pokémon ☹️</div>)}

          {shouldDisplayProfileByName && (
            <PokemonProfile pokemonData={pokemonByName} />
          )}
          {shouldDisplayProfileById && (
            <PokemonProfile pokemonData={pokemonById} />
          )}

          <div className="flex justify-between mt-auto">
            <Button
              type="button"
              onClick={handlePrevious}
              disabled={pokemonId === null || pokemonId <= 1}
            >
              Previous
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              disabled={!pokemonByName && !pokemonById}
            >
              Next
            </Button>
          </div>
        </form>

        <SearchPokemon />
      </div>
    </div>
  );
}
