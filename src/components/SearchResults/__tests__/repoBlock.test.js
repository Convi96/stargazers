import React from "react";
import { render } from "@testing-library/react-native";
import { RepoBlock } from "../RepoBlock";

const mockRepo = require("../../../data/response_repo.json");

describe("RepoBlock", () => {
  it("renders correctly", () => {
    const repoData = mockRepo;
    const { getByTestId } = render(
      <RepoBlock
        repoData={repoData}
        owner={mockRepo.owner.login}
        repo={mockRepo.name}
      />
    );
    expect(getByTestId("repoTitle").props.children).toBe(repoData.full_name);
    expect(getByTestId("repoStars").props.children).toBe(
      repoData.stargazers_count
    );
    expect(getByTestId("repoForks").props.children).toBe(repoData.forks_count);
  });
});
