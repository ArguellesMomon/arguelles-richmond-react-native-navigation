import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Modal,
  FlatList,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { createStyles } from "./styles";

export interface FilterOptions {
  sortBy: "name" | "priceLow" | "priceHigh";
  priceRange: "all" | "under500" | "500to1000" | "over1000";
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilter?: (filters: FilterOptions) => void;
  placeholder?: string;
}

const SORT_OPTIONS = [
  { id: "name", label: "Name (A-Z)", icon: "text-outline" },
  { id: "priceLow", label: "Price: Low to High", icon: "arrow-up-outline" },
  { id: "priceHigh", label: "Price: High to Low", icon: "arrow-down-outline" },
];

const PRICE_RANGES = [
  { id: "all", label: "All Prices", icon: "pricetag-outline" },
  { id: "under500", label: "Under ₱500", icon: "pricetag-outline" },
  { id: "500to1000", label: "₱500 - ₱1,000", icon: "pricetag-outline" },
  { id: "over1000", label: "Over ₱1,000", icon: "pricetag-outline" },
];

export default function SearchBar({
  onSearch,
  onFilter,
  placeholder = "Search products...",
}: SearchBarProps) {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [searchAnimation] = useState(new Animated.Value(0));

  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "name",
    priceRange: "all",
  });

  // Create styles using colors from theme
  const styles = createStyles(colors, isSearchActive);

  // Handle search input change
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  // Activate search mode
  const activateSearch = () => {
    setIsSearchActive(true);
    Animated.timing(searchAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // Deactivate search mode
  const deactivateSearch = () => {
    if (searchQuery.length === 0) {
      setIsSearchActive(false);
      Animated.timing(searchAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
    if (onSearch) {
      onSearch("");
    }
    Animated.timing(searchAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // Open filter modal
  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  // Apply filters
  const applyFilters = () => {
    if (onFilter) {
      onFilter(filters);
    }
    setFilterModalVisible(false);
  };

  // Reset filters
  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      sortBy: "name",
      priceRange: "all",
    };
    setFilters(defaultFilters);
    if (onFilter) {
      onFilter(defaultFilters);
    }
  };

  const hasActiveFilters = filters.sortBy !== "name" || filters.priceRange !== "all";

  return (
    <>
      {/* Search Bar */}
      <View style={styles.container}>
        <Ionicons
          name="search-outline"
          size={20}
          color={isSearchActive ? colors.primary : colors.textSecondary}
          style={styles.searchIcon}
        />

        {isSearchActive ? (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={handleSearchChange}
            onBlur={deactivateSearch}
            autoFocus
            returnKeyType="search"
          />
        ) : (
          <Pressable style={{ flex: 1 }} onPress={activateSearch}>
            <Text style={styles.placeholder}>
              {searchQuery || placeholder}
            </Text>
          </Pressable>
        )}

        {searchQuery.length > 0 && (
          <Pressable style={styles.clearButton} onPress={clearSearch}>
            <Ionicons
              name="close-circle"
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>
        )}

        <Pressable
          style={[
            styles.filterButton,
            hasActiveFilters && styles.filterButtonActive,
          ]}
          onPress={openFilterModal}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={hasActiveFilters ? "#FFFFFF" : colors.primary}
          />
        </Pressable>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setFilterModalVisible(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              <View style={styles.modalHandle} />

              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filter & Sort</Text>
                <Pressable style={styles.resetButton} onPress={resetFilters}>
                  <Text style={styles.resetButtonText}>Reset</Text>
                </Pressable>
              </View>

              <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                  <>
                    {/* Sort By Section */}
                    <Text style={styles.sectionTitle}>Sort By</Text>
                    {SORT_OPTIONS.map((option) => (
                      <Pressable
                        key={option.id}
                        style={[
                          styles.optionItem,
                          filters.sortBy === option.id &&
                            styles.optionItemSelected,
                        ]}
                        onPress={() =>
                          setFilters((prev) => ({
                            ...prev,
                            sortBy: option.id as any,
                          }))
                        }
                      >
                        <View
                          style={[
                            styles.optionIcon,
                            filters.sortBy === option.id &&
                              styles.optionIconSelected,
                          ]}
                        >
                          <Ionicons
                            name={option.icon as any}
                            size={20}
                            color={
                              filters.sortBy === option.id
                                ? "#FFFFFF"
                                : colors.text
                            }
                          />
                        </View>
                        <Text style={styles.optionLabel}>{option.label}</Text>
                        <View
                          style={[
                            styles.radioButton,
                            filters.sortBy === option.id &&
                              styles.radioButtonSelected,
                          ]}
                        >
                          {filters.sortBy === option.id && (
                            <View style={styles.radioButtonInner} />
                          )}
                        </View>
                      </Pressable>
                    ))}

                    {/* Price Range Section */}
                    <Text style={[styles.sectionTitle, { marginTop: 10 }]}>
                      Price Range
                    </Text>
                    {PRICE_RANGES.map((range) => (
                      <Pressable
                        key={range.id}
                        style={[
                          styles.optionItem,
                          filters.priceRange === range.id &&
                            styles.optionItemSelected,
                        ]}
                        onPress={() =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: range.id as any,
                          }))
                        }
                      >
                        <View
                          style={[
                            styles.optionIcon,
                            filters.priceRange === range.id &&
                              styles.optionIconSelected,
                          ]}
                        >
                          <Ionicons
                            name={range.icon as any}
                            size={20}
                            color={
                              filters.priceRange === range.id
                                ? "#FFFFFF"
                                : colors.text
                            }
                          />
                        </View>
                        <Text style={styles.optionLabel}>{range.label}</Text>
                        <View
                          style={[
                            styles.radioButton,
                            filters.priceRange === range.id &&
                              styles.radioButtonSelected,
                          ]}
                        >
                          {filters.priceRange === range.id && (
                            <View style={styles.radioButtonInner} />
                          )}
                        </View>
                      </Pressable>
                    ))}
                  </>
                }
                data={[]}
                renderItem={null}
              />

              {/* Apply Button */}
              <Pressable style={styles.applyButton} onPress={applyFilters}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}