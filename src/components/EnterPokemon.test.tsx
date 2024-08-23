import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EnterPokemon from "./EnterPokemon";
import { usePokemonQueryId } from "../hooks/usePokemonQueryId";
import { usePokemonQueryName } from "../hooks/usePokemonQueryName";

jest.mock("../hooks/usePokemonQueryId");
jest.mock("../hooks/usePokemonQueryName");

describe("EnterPokemon component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Bulbasaur, then Ivysaur on Next, and return to Bulbasaur on Previous", async () => {
    (usePokemonQueryName as jest.Mock).mockImplementation(({ name }) => {
      if (name === "bulbasaur") {
        return {
          isLoading: false,
          data: { id: 1, name: "bulbasaur", sprites: { front_default: "" } },
          error: null,
          refetch: jest.fn().mockResolvedValue({
            data: { id: 1, name: "bulbasaur", sprites: { front_default: "" } },
          }),
        };
      }
      if (name === "ivysaur") {
        return {
          isLoading: false,
          data: { id: 2, name: "ivysaur", sprites: { front_default: "" } },
          error: null,
          refetch: jest.fn().mockResolvedValue({
            data: { id: 2, name: "ivysaur", sprites: { front_default: "" } },
          }),
        };
      }
      return {
        isLoading: false,
        data: null,
        error: null,
        refetch: jest.fn(),
      };
    });

    (usePokemonQueryId as jest.Mock).mockImplementation(({ id }) => {
      if (id === 1) {
        return {
          isLoading: false,
          data: { id: 1, name: "bulbasaur", sprites: { front_default: "" } },
          error: null,
        };
      }
      if (id === 2) {
        return {
          isLoading: false,
          data: { id: 2, name: "ivysaur", sprites: { front_default: "" } },
          error: null,
        };
      }
      return {
        isLoading: false,
        data: null,
        error: null,
      };
    });

    render(<EnterPokemon />);

    const searchInput = screen.getByPlaceholderText("Enter a Pokémon name...");
    fireEvent.change(searchInput, { target: { value: "bulbasaur" } });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Previous"));

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    });
  });
});
