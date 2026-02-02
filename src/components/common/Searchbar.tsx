import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

interface SearchBarProps {
  onSearchPress?: () => void;
  onFilterPress?: () => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearchPress,
  onFilterPress,
  placeholder = "Search products...",
}: SearchBarProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchIcon: {
      marginRight: 8,
    },
    placeholder: {
      flex: 1,
      fontSize: 15,
      color: colors.textSecondary,
    },
    filterButton: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: colors.card,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.primary,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onSearchPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name="search-outline"
        size={20}
        color={colors.textSecondary}
        style={styles.searchIcon}
      />
      <Text style={styles.placeholder}>{placeholder}</Text>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={onFilterPress}
        activeOpacity={0.7}
      >
        <Ionicons name="options-outline" size={20} color={colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}