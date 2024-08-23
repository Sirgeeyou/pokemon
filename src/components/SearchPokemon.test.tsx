import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { getMatchingPokemon } from "../services/apiPokemon";
import SearchPokemon from "./SearchPokemon";

jest.mock("../services/apiPokemon", () => ({
  getMatchingPokemon: jest.fn(),
}));

describe("SearchPokemon", () => {
  it("should fetch and display Pokémon names when input changes", async () => {
    const mockPokemonData = [
      { id: 1, name: "Bulbasaur" },
      { id: 2, name: "Ivysaur" },
    ];

    (getMatchingPokemon as jest.Mock).mockResolvedValue(mockPokemonData);

    render(<SearchPokemon />);

    fireEvent.change(screen.getByPlaceholderText("Search for a Pokémon..."), {
      target: { value: "bulba" },
    });

    await waitFor(() => {
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("Ivysaur")).toBeInTheDocument();
    });
  });
});

jest.mock("../services/apiPokemon", () => ({
  getMatchingPokemon: jest.fn(),
}));

describe("SearchPokemon", () => {
  it('should display "No Pokémon found" when no results are returned', async () => {
    (getMatchingPokemon as jest.Mock).mockResolvedValue([]);

    render(<SearchPokemon />);

    fireEvent.change(screen.getByPlaceholderText("Search for a Pokémon..."), {
      target: { value: "nonexistentpokemon" },
    });

    await waitFor(() => {
      expect(screen.getByText("No Pokémon found")).toBeInTheDocument();
    });
  });
});
