import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProductCard, ProductModal } from "../../components/Product";
import { SearchBar } from "../../components/common";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import useProductModal from "../../hooks/useProductModal";
import { PRODUCTS } from "../../data/products";
import { Product } from "../../types";

export default function HomeScreen({ navigation }: any) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const { selectedProduct, visible, openModal, closeModal } = useProductModal();

  const handleSearchPress = () => {
    // TODO: Implement search functionality
    console.log("Search pressed");
  };

  const handleFilterPress = () => {
    // TODO: Implement filter functionality
    console.log("Filter pressed");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.card,
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 16,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      elevation: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    headerLeft: {
      flex: 1,
    },
    greeting: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
    },
    headerRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    iconButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    cartButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    cartBadge: {
      position: "absolute",
      top: -4,
      right: -4,
      backgroundColor: colors.danger,
      borderRadius: 12,
      minWidth: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 6,
      borderWidth: 2,
      borderColor: colors.card,
    },
    cartBadgeText: {
      color: "#FFFFFF",
      fontSize: 11,
      fontWeight: "bold",
    },
    listHeader: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 12,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
    },
    sectionSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingBottom: 100,
    },
    floatingCartButton: {
      position: "absolute",
      bottom: 20,
      left: 20,
      right: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 16,
      elevation: 8,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      gap: 10,
    },
    floatingCartText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} onPress={() => openModal(item)} />
  );

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.sectionTitle}>Featured Products</Text>
      <Text style={styles.sectionSubtitle}>
        Discover our latest collection
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
            <Text style={styles.greeting}>Hello! 👋</Text>
            <Text style={styles.title}>Shop Now</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={toggleTheme}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isDark ? "sunny" : "moon"}
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => navigation.navigate("Cart")}
              activeOpacity={0.7}
            >
              <Ionicons name="cart-outline" size={26} color="#FFFFFF" />
              {totalItems > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {totalItems > 99 ? "99+" : totalItems}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* SearchBar Component */}
        <SearchBar
          onSearchPress={handleSearchPress}
          onFilterPress={handleFilterPress}
          placeholder="Search products..."
        />
      </View>

      <FlatList
        data={PRODUCTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {totalItems > 0 && (
        <TouchableOpacity
          style={styles.floatingCartButton}
          onPress={() => navigation.navigate("Cart")}
          activeOpacity={0.9}
        >
          <Ionicons name="cart" size={24} color="#FFFFFF" />
          <Text style={styles.floatingCartText}>
            View Cart ({totalItems})
          </Text>
        </TouchableOpacity>
      )}

      <ProductModal
        visible={visible}
        product={selectedProduct}
        onClose={closeModal}
      />
    </SafeAreaView>
  );
}