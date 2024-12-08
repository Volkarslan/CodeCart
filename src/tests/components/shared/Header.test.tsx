import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { store } from "../../../context/store";
import { TRANSLATIONS } from "../../../constants/translations";
import Header from "../../../components/shared/Header";

const t = TRANSLATIONS["en"];

describe("Header Component", () => {
  const renderWithRedux = (component: JSX.Element) =>
    render(<Provider store={store}>{component}</Provider>);

  it("should render the project name and description", () => {
    renderWithRedux(<Header />);
    expect(screen.getByText(t.project.name)).toBeInTheDocument();

    expect(screen.getByText(t.project.description)).toBeInTheDocument();
  });

  it("should display the cart button with the correct label", () => {
    renderWithRedux(<Header />);
    const cartButton = screen.getByText(t.buttons.cart);
    expect(cartButton).toBeInTheDocument();
  });

  it("should display the cart item count when there are items in the cart", () => {
    store.dispatch({
      type: "cart/addItem",
      payload: {
        id: "1",
        name: "Sample Product",
        price: "10.00",
        image: "sample.jpg",
        quantity: 1,
      },
    });

    renderWithRedux(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const itemCount = screen.getByText("1");
    expect(itemCount).toBeInTheDocument();
  });
});
