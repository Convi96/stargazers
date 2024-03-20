import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Home from "../Home";

describe("Home", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId("ownerInput")).toBeTruthy();
    expect(getByTestId("repoInput")).toBeTruthy();
    expect(getByTestId("searchButton")).toBeTruthy();
  });

  it("handles onChangeText", () => {
    const { getByTestId } = render(<Home />);
    fireEvent.changeText(getByTestId("ownerInput"), "new owner");
    fireEvent.changeText(getByTestId("repoInput"), "new repo");
  });
});
