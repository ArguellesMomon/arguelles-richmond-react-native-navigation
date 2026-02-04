import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProductCard, ProductModal } from "../../components/Product";
import SearchBar from "../../components/common/Searchbar";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import useProductModal from "../../hooks/useProductModal";
import { PRODUCTS } from "../../data/products";
import { Product } from "../../types";
import { createStyles } from "./styles";


// FilterOptions interface (matches SearchBar)
interface FilterOptions {
  sortBy: "name" | "priceLow" | "priceHigh" | "newest";
  priceRange: "all" | "under500" | "500to1000" | "over1000";
}

export default function HomeScreen({ navigation }: any) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const { selectedProduct, visible, openModal, closeModal } = useProductModal();
    const styles = createStyles(colors);
  

  // Search and Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "name",
    priceRange: "all",
  });

  // Filter and sort products based on search and filters
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    }

    // Apply price range filter
    switch (filters.priceRange) {
      case "under500":
        result = result.filter((p) => p.price < 500);
        break;
      case "500to1000":
        result = result.filter((p) => p.price >= 500 && p.price <= 1000);
        break;
      case "over1000":
        result = result.filter((p) => p.price > 1000);
        break;
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "priceLow":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.reverse();
        break;
    }

    return result;
  }, [searchQuery, filters]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle filter
  const handleFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };


  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} onPress={() => openModal(item)} />
  );

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.sectionTitle}>
        {searchQuery
          ? `Search Results (${filteredProducts.length})`
          : "Featured Products"}
      </Text>
      {!searchQuery && (
        <Text style={styles.sectionSubtitle}>
          Discover our latest collection
        </Text>
      )}
      {searchQuery && filteredProducts.length > 0 && (
        <Text style={styles.sectionSubtitle}>
          Found {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
        </Text>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="search-outline"
        size={80}
        color={colors.textSecondary}
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyTitle}>No products found</Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery
          ? `No results for "${searchQuery}"\nTry different keywords or adjust your filters`
          : "Try adjusting your search or filters"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.card}
      />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Shop Now</Text>
          </View>
          <View style={styles.headerRight}>
            <Pressable
              style={styles.iconButton}
              onPress={toggleTheme}
            >
              <Ionicons
                name={isDark ? "sunny" : "moon"}
                size={24}
                color={colors.text}
              />
            </Pressable>

            <Pressable
              style={styles.cartButton}
              onPress={() => navigation.navigate("Cart")}
            >
              <Ionicons name="cart-outline" size={26} color="#FFFFFF" />
              {totalItems > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {totalItems > 99 ? "99+" : totalItems}
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>

        {/* Functional SearchBar Component */}
        <SearchBar
          onSearch={handleSearch}
          onFilter={handleFilter}
          placeholder="Search products..."
        />
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Product Detail Modal */}
      <ProductModal
        visible={visible}
        product={selectedProduct}
        onClose={closeModal}
      />
    </SafeAreaView>
  );
}