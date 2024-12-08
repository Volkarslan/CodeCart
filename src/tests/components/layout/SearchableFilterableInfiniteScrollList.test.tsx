import React from "react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchableFilterableInfiniteScrollList from "../../../components/Layout/SearchableFilterableInfiniteScrollList";
import { fetchFakeProducts } from "../../../data/fakeData";
import { Provider } from "react-redux";
import { store } from "../../../context/store";

vi.mock("../../../data/fakeData", () => ({
  fetchFakeProducts: vi.fn(),
}));

describe("SearchableFilterableInfiniteScrollList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state initially", () => {
    render(
      <Provider store={store}>
        <SearchableFilterableInfiniteScrollList />
      </Provider>
    );

    expect(
      screen.getByText(/loading products, please wait.../i)
    ).toBeInTheDocument();
  });

  it("should fetch and render products", async () => {
    const mockProducts = [
      {
        id: "1",
        name: "Product A",
        price: "100.00",
        image: "image-a.jpg",
        category: "Category 1",
      },
      {
        id: "2",
        name: "Product B",
        price: "200.00",
        image: "image-b.jpg",
        category: "Category 2",
      },
    ];

    (
      fetchFakeProducts as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(mockProducts);

    render(
      <Provider store={store}>
        <SearchableFilterableInfiniteScrollList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
      expect(screen.getByText("Product B")).toBeInTheDocument();
    });
  });

  it("should filter products by search term", async () => {
    const mockProducts = [
      {
        id: "1",
        name: "Product A",
        price: "100.00",
        image: "image-a.jpg",
        category: "Category 1",
      },
      {
        id: "2",
        name: "Product B",
        price: "200.00",
        image: "image-b.jpg",
        category: "Category 2",
      },
    ];

    (
      fetchFakeProducts as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(mockProducts);

    render(
      <Provider store={store}>
        <SearchableFilterableInfiniteScrollList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
      expect(screen.getByText("Product B")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search products.../i);
    fireEvent.change(searchInput, { target: { value: "A" } });

    expect(screen.queryByText("Product B")).not.toBeInTheDocument();
    expect(screen.getByText("Product A")).toBeInTheDocument();
  });

  it("should filter products by category", async () => {
    const mockProducts = [
      {
        id: "1",
        name: "Product A",
        price: "100.00",
        image: "image-a.jpg",
        category: "Category 1",
      },
      {
        id: "2",
        name: "Product B",
        price: "200.00",
        image: "image-b.jpg",
        category: "Category 2",
      },
    ];

    (
      fetchFakeProducts as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(mockProducts);

    render(
      <Provider store={store}>
        <SearchableFilterableInfiniteScrollList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
      expect(screen.getByText("Product B")).toBeInTheDocument();
    });

    const categoryButton = screen.getByText("Category 1");
    fireEvent.click(categoryButton);

    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.queryByText("Product B")).not.toBeInTheDocument();
  });

  it("should load more products on scroll", async () => {
    const mockProductsPage1 = [
      {
        id: "1",
        name: "Product A",
        price: "100.00",
        image: "image-a.jpg",
        category: "Category 1",
      },
    ];
    const mockProductsPage2 = [
      {
        id: "2",
        name: "Product B",
        price: "200.00",
        image: "image-b.jpg",
        category: "Category 2",
      },
    ];

    (fetchFakeProducts as unknown as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce(mockProductsPage1)
      .mockResolvedValueOnce(mockProductsPage2);

    render(
      <Provider store={store}>
        <SearchableFilterableInfiniteScrollList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
    });

    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    await waitFor(() => {
      expect(screen.getByText("Product B")).toBeInTheDocument();
    });
  });
});
