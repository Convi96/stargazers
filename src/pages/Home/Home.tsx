import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LottieView from "lottie-react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utilities/navigatorTypes";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";

import { colors } from "../../utilities/colors";
import CustomTextInput from "../../components/Inputs/CustomTextInput";
import { spaces } from "../../utilities/spaces";
import CustomButton from "../../components/Buttons/CustomButton";

import { OctokitClient, listUserRepoResponse } from "../../utilities/octokit";
import { ErrorType } from "../../utilities/types";
import { getErrorMessage } from "../../utilities/utilities";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home: React.FC<Props> = ({ navigation }) => {
  const [owner, setOwner] = React.useState("octokit");
  const [repo, setRepo] = React.useState("types.ts");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<ErrorType>({
    error: false,
  });

  // Function to fetch repository data from Octokit API and navigate to search results page
  const getData = async () => {
    try {
      const { data: repoData }: listUserRepoResponse =
        await OctokitClient.rest.repos.get({
          owner,
          repo,
        });
      navigation.navigate("SearchResultsPage", { owner, repo, repoData });
    } catch (error: any) {
      setError({
        error: true,
        message: getErrorMessage(error.status),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setError({ error: false });
    setLoading(true);
    getData();
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/images/background.webp")}
        contentFit="cover"
        transition={1000}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.innerContainer}>
          <AnimatedLottieView
            entering={FadeInDown.duration(1000)}
            autoPlay
            style={{
              width: 200,
              height: 200,
            }}
            source={require("../../../assets/animations/github.json")}
          />
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000)}
            style={styles.searchContainer}
          >
            <CustomTextInput
              value={owner}
              onChangeText={(text) => setOwner(text)}
              testID="ownerInput"
              placeholder="Convi96"
              labelText="Owner of the repository"
            ></CustomTextInput>
            <CustomTextInput
              value={repo}
              onChangeText={(text) => setRepo(text)}
              testID="repoInput"
              placeholder="Stargazing"
              labelText="Name of the repository"
              style={{ marginBottom: spaces.medium }}
            ></CustomTextInput>
            <CustomButton
              loading={loading}
              title="Search"
              onPress={handleSearch}
              testID="searchButton"
            ></CustomButton>
            {error.error && (
              <Text style={styles.errorMessage}>{error.message}</Text>
            )}
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

//Stylesheet of the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  innerContainer: {
    marginTop: -100,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: spaces.medium,
    justifyContent: "flex-end",
  },
  image: {
    height: 300,
  },
  animationLogoContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: -100,
  },
  searchContainer: {
    marginTop: spaces.extraLarge,
    display: "flex",
    alignItems: "center",
    marginHorizontal: spaces.medium,
    width: "100%",
  },
  errorMessage: {
    color: colors.red,
    fontFamily: "MonaSans-Regular",
    marginBottom: spaces.medium,
  },
});

export default Home;
