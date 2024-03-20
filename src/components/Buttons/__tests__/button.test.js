import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import CustomButton from "../CustomButton";

describe("CustomButton", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <CustomButton title="Test" onPress={() => {}} />
    );
    expect(getByText("Test")).toBeTruthy();
  });

  it("handles onPress", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <CustomButton title="Test" onPress={onPressMock} />
    );
    fireEvent.press(getByText("Test"));
    expect(onPressMock).toHaveBeenCalled();
  });

  it("shows loading state", () => {
    const { getByText, rerender } = render(
      <CustomButton title="Test" onPress={() => {}} />
    );
    rerender(<CustomButton title="Test" onPress={() => {}} loading />);
    expect(getByText("Cerco...")).toBeTruthy();
  });
});
