import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../../utilities/colors";

interface CustomButtonProps {
  loading?: boolean;
  title: string;
  onPress: () => void;
  testID: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  testID,
  loading,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.button, loading && styles.loading]}
      onPress={onPress}
      disabled={loading}
      testID={testID}
    >
      {loading ? (
        <Text style={styles.buttonText}>Cerco...</Text>
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loading: {
    backgroundColor: colors.primaryOpacity,
  },
});

export default CustomButton;
