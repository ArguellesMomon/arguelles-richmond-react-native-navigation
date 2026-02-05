import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../../types";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  const { colors } = useTheme();
  const { isInCart } = useCart();
  const inCart = isInCart(product.id);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      overflow: "hidden",
      marginBottom: 16,
      elevation: 3,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    imageContainer: {
      position: "relative",
      width: "100%",
      height: 180,
      backgroundColor: colors.background,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    imagePlaceholder: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    badge: {
      position: "absolute",
      top: 12,
      right: 12,
      backgroundColor: colors.success,
      borderRadius: 20,
      width: 36,
      height: 36,
      justifyContent: "center",
      alignItems: "center",
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    categoryBadge: {
      position: "absolute",
      top: 12,
      left: 12,
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    categoryText: {
      color: "#FFFFFF",
      fontSize: 11,
      fontWeight: "700",
    },
    content: {
      padding: 14,
    },
    name: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 6,
      lineHeight: 22,
    },
    description: {
      fontSize: 13,
      color: colors.textSecondary,
      marginBottom: 10,
      lineHeight: 18,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    priceContainer: {
      flex: 1,
    },
    priceLabel: {
      fontSize: 11,
      color: colors.textSecondary,
      marginBottom: 2,
    },
    price: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.primary,
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
      gap: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    ratingText: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.shadow,
    },
  });

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {product.image ? (
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={60} color={colors.textSecondary} />
          </View>
        )}
        {product.category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
        )}
        {inCart && (
          <View style={styles.badge}>
            <Ionicons name="checkmark" size={20} color="#FFFFFF" />
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        {product.description && (
          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>
        )}
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>₱{product.price.toLocaleString()}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}