import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithContext, getStateWithItems } from "../../test-utils";
import { Cart } from "./Cart";
import * as api from "../../app/api";
import { tab } from "@testing-library/user-event/dist/types/convenience";

type Product = api.Product;

const checkoutSpy = jest.spyOn(api, "checkout");

test("an empty cart should not have any items", () => {
    renderWithContext(<Cart />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(2);
    screen.getByText("$0.00", { selector: ".total" });
});

test("cart should display correct total", () => {
    const state = getStateWithItems(
        { testItem: 3 },
        { testItem: { name: "Test Product", price: 11.11 } as Product }
    );
    renderWithContext(<Cart />, state);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(3);
    screen.getByText("$33.33", { selector: ".total" });
});

test("updating product quantity should update total", async () => {
    const state = getStateWithItems(
        { testItem: 3 },
        { testItem: { name: "Test Product", price: 11.11 } as Product }
    );
    renderWithContext(<Cart />, state);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(3);
    screen.getByText("$33.33", { selector: ".total" });
    const input = screen.getByLabelText(/test product quantity/i);
    await userEvent.clear(input);
    await userEvent.tab();
    screen.getByText("$0.00", { selector: ".total" });
    await userEvent.type(input, "4");
    await userEvent.tab();
    screen.getByText("$44.44", { selector: ".total" });
});

test("removing items should update total", async () => {
    const state = getStateWithItems(
        { carrots: 2, bunnies: 3 },
        {
             carrots: { name: "Carrots", price: 5.50 } as Product,
             bunnies: { name: "Bunnies", price: 20.0 } as Product
        }
    );
    renderWithContext(<Cart />, state);
    screen.getByText("$71.00", { selector: ".total" });
    const removeBunnies = screen.getByTitle(/remove bunnies/i);
    await userEvent.click(removeBunnies);
    screen.getByText("$11.00", { selector: ".total" });
    const removeCarrots = screen.getByTitle(/remove carrots/i);
    await userEvent.click(removeCarrots);
    screen.getByText("$0.00", { selector: ".total" });
});

test("cannot checkout with an empty cart", async () => {
    checkoutSpy.mockRejectedValueOnce(new Error("Cart must not be empty"));
    renderWithContext(<Cart />);
    const checkout = screen.getByRole("button", { name: "Checkout" });
    const table = screen.getByRole("table");
    expect(table).not.toHaveClass("checkoutLoading");
    await userEvent.click(checkout);
    // expect(table).toHaveClass("checkoutLoading");
    await screen.findByText("Cart must not be empty");
    expect(table).toHaveClass("checkoutError");
});

test("should clear items after checkout", async () => {
    checkoutSpy.mockResolvedValueOnce({ success: true });
    const state = getStateWithItems(
        { carrots: 2, bunnies: 3 },
        {
             carrots: { name: "Carrots", price: 5.50 } as Product,
             bunnies: { name: "Bunnies", price: 20.0 } as Product
        }
    );
    renderWithContext(<Cart />, state);
    screen.getByText("$71.00", { selector: ".total" });
    expect(screen.getAllByRole("row")).toHaveLength(4);
    const checkout = screen.getByRole("button", { name: "Checkout" });
    await userEvent.click(checkout);

    await waitFor(() => {
        screen.getByText("$0.00", { selector: ".total" });
        expect(screen.getAllByRole("row")).toHaveLength(2);
        expect(screen.getByRole("table")).not.toHaveClass("checkoutError");
    });
});