import React from "react";
import { render } from "@testing-library/react-native";
import { UserBlock } from "../UserBlock";

const mockUsers = require("../../../data/response_stars.json");

describe("UserBlock", () => {
  it("renders correctly", () => {
    const user = mockUsers.data[0];
    const { getByTestId } = render(<UserBlock user={user} index={0} />);
    expect(getByTestId("userUsername").props.children).toBe(user.login);
  });

  it("shows user avatar", () => {
    const user = mockUsers.data[0];
    const { getByTestId } = render(<UserBlock user={user} index={0} />);
    expect(getByTestId("userAvatar").props.source[0].uri).toBe(user.avatar_url);
  });
});
