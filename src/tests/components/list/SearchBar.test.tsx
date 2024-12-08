import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest"; // Vitest fonksiyonları
import SearchBar from "../../../components/List/SearchBar";
import { TRANSLATIONS } from "../../../constants/translations";

const t = TRANSLATIONS["en"];

describe("SearchBar Component", () => {
  it("should render the search bar with placeholder text", () => {
    render(<SearchBar searchTerm="" setSearchTerm={vi.fn()} />);

    const inputElement = screen.getByPlaceholderText(t.search.placeholder);
    expect(inputElement).toBeInTheDocument();
  });

  it("should display the correct search term in the input field", () => {
    const searchTerm = "test";
    render(<SearchBar searchTerm={searchTerm} setSearchTerm={vi.fn()} />);

    const inputElement = screen.getByPlaceholderText(t.search.placeholder);
    expect(inputElement).toHaveValue(searchTerm);
  });

  it("should call setSearchTerm function when typing in the input field", () => {
    const setSearchTermMock = vi.fn(); // Vitest'in `vi` fonksiyonu kullanılıyor
    render(<SearchBar searchTerm="" setSearchTerm={setSearchTermMock} />);

    const inputElement = screen.getByPlaceholderText(t.search.placeholder);

    fireEvent.change(inputElement, { target: { value: "new search" } });

    expect(setSearchTermMock).toHaveBeenCalledTimes(1);
    expect(setSearchTermMock).toHaveBeenCalledWith("new search");
  });
});
