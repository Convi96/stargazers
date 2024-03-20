import { Octokit } from "@octokit/rest";
import { Endpoints } from "@octokit/types";

export type listUserRepoResponse =
  Endpoints["GET /repos/{owner}/{repo}"]["response"];

export type listRepoStargazers =
  Endpoints["GET /repos/{owner}/{repo}/stargazers"]["response"];
export type listRepoStargazersUser = listRepoStargazers["data"][0];

export const OctokitClient = new Octokit({
  baseUrl: "https://api.github.com",
});
