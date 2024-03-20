import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { listUserRepoResponse } from "../../utilities/octokit";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { spaces } from "../../utilities/spaces";
import { colors } from "../../utilities/colors";

export const RepoBlock = ({
  repoData,
  owner,
  repo,
}: {
  repoData: listUserRepoResponse["data"];
  owner: string;
  repo: string;
}) => {
  return (
    <View style={styles.repoDataContainer}>
      <View style={styles.leftContainer}>
        <Image
          style={styles.image}
          source={{ uri: repoData.owner.avatar_url }}
        />
        <View style={styles.textContainer}>
          <Text
            testID="repoTitle"
            style={styles.repoDataTitle}
          >{`${owner}/${repo}`}</Text>
          <Text numberOfLines={1} style={styles.repoDataDescription}>
            {repoData.description}
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.statsLine}>
          <Text testID="repoStars" style={styles.statsNumber}>
            {repoData.stargazers_count}
          </Text>
          <Ionicons name="star" size={24} color={colors.primary} />
        </View>
        <View style={styles.statsLine}>
          <Text testID="repoForks" style={styles.statsNumber}>
            {repoData.forks_count}
          </Text>
          <Ionicons name="git-network" size={24} color={colors.primary} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
