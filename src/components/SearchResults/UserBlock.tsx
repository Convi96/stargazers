import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { listRepoStargazersUser } from "../../utilities/octokit";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";
import { spaces } from "../../utilities/spaces";

const shouldSkip = (
  prev: { user: listRepoStargazersUser },
  next: { user: listRepoStargazersUser }
) => {
  return prev.user.id === next.user.id;
};

export const UserBlock = React.memo(
  ({ user, index }: { user: listRepoStargazersUser; index: number }) => {
    return (
      <Animated.View
        entering={FadeInDown.delay(50 * (index % 30))}
        style={styles.userBlock}
      >
        <Image
          testID="userAvatar"
          style={styles.userImage}
          source={{ uri: user.avatar_url }}
        />
        <Text testID="userUsername" style={styles.username}>
          {user.login}
        </Text>
      </Animated.View>
    );
  },
  shouldSkip
);

const styles = StyleSheet.create({
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
});
