import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomTextInput from "../CustomTextInput";

describe("CustomTextInput", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <CustomTextInput placeholder="Test" />
    );
    expect(getByPlaceholderText("Test")).toBeTruthy();
  });

  it("handles onChangeText", () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <CustomTextInput placeholder="Test" onChangeText={onChangeTextMock} />
    );
    fireEvent.changeText(getByPlaceholderText("Test"), "new text");
    expect(onChangeTextMock).toHaveBeenCalledWith("new text");
  });

  it("shows labelText", () => {
    const { getByText } = render(<CustomTextInput labelText="Label" />);
    expect(getByText("Label")).toBeTruthy();
  });
});
