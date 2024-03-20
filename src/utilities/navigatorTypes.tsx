import { listUserRepoResponse } from "./octokit";

export type RootStackParamList = {
  Home: undefined;
  SearchResultsPage: {
    owner: string;
    repo: string;
    repoData: listUserRepoResponse["data"];
  };
};
