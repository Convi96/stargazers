import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { RootStackParamList } from "../../utilities/navigatorTypes";
import {
  OctokitClient,
  listRepoStargazers,
  listRepoStargazersUser,
} from "../../utilities/octokit";
import { colors } from "../../utilities/colors";
import { spaces } from "../../utilities/spaces";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ErrorType } from "../../utilities/types";
import { UserBlock } from "../../components/SearchResults/UserBlock";
import { RepoBlock } from "../../components/SearchResults/RepoBlock";
import { getErrorMessage } from "../../utilities/utilities";

type Props = NativeStackScreenProps<RootStackParamList, "SearchResultsPage">;

const SearchResultsPage: React.FC<Props> = ({ navigation, route }) => {
  const { owner, repo, repoData } = route.params;

  const [searchResults, setSearchResults] = useState<listRepoStargazersUser[]>(
    []
  );
  const insets = useSafeAreaInsets();
  const [error, setError] = React.useState<ErrorType>({
    error: false,
  });
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const totalPages = Math.ceil(repoData.stargazers_count / 30);

  // Function to fetch paged stargazers data from Octokit API
  const getData = async (page: number = 1) => {
    try {
      const { data }: listRepoStargazers =
        await OctokitClient.rest.activity.listStargazersForRepo({
          owner,
          repo,
          page,
        });
      const newData = [...searchResults, ...data];
      setSearchResults(newData);
    } catch (error: any) {
      setError({
        error: true,
        message: getErrorMessage(error.status),
      });
    } finally {
      setLoading(false);
    }
  };

  const loadNewPage = () => {
    if (page < totalPages) {
      setLoading(true);
      getData(page + 1);
      setPage(page + 1);
    }
  };

  // Fetch data on first render
  useEffect(() => {
    getData();
  }, []);

  // Loader component shown when loading new data
  const LoaderBlock = () => {
    return (
      <View style={{ padding: 15 }}>
        <ActivityIndicator color="white" />
      </View>
    );
  };

  const renderItem = React.useCallback(
    ({ item, index }: { item: listRepoStargazersUser; index: number }) => {
      return <UserBlock user={item} index={index} />;
    },
    []
  );

  return (
    <View
      style={[
        styles.container,
        Platform.OS == "android" && { paddingTop: insets.top },
        { paddingBottom: insets.bottom },
      ]}
    >
      <RepoBlock repoData={repoData} owner={owner} repo={repo} />
      <View style={styles.divider}></View>
      <Text style={styles.listTitle}>
        Stargazers count: {repoData.stargazers_count}
      </Text>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          loadNewPage();
        }}
        renderItem={renderItem}
        ListFooterComponent={loading ? LoaderBlock : null}
      />
      {error.error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  repoDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "white",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 20,
    marginRight: spaces.small,
  },
  textContainer: {
    flex: 1,
    marginRight: spaces.small,
  },
  repoDataTitle: {
    fontSize: 16,
    fontFamily: "MonaSans-SemiBold",
    marginBottom: spaces.small,
  },
  statsContainer: {},
  statsLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  statsNumber: {
    marginRight: spaces.small,
    fontFamily: "MonaSans-SemiBold",
  },
  repoDataDescription: {
    fontFamily: "MonaSans-Light",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.6)",
    marginVertical: spaces.medium,
  },
  listTitle: {
    color: "white",
    fontFamily: "MonaSans-SemiBold",
    fontSize: 22,
    marginBottom: spaces.medium,
  },
  userBlock: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: spaces.small,
  },
  username: {
    color: "white",
    fontFamily: "MonaSans-Regular",
    fontSize: 16,
  },
  errorMessage: {
    color: colors.red,
    fontFamily: "MonaSans-Regular",
    marginBottom: spaces.medium,
    textAlign: "center",
    paddingTop: spaces.medium,
  },
});

export default SearchResultsPage;
