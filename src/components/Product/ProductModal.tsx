import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";

interface ProductModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
}

const { width, height } = Dimensions.get("window");

export default function ProductModal({
  visible,
  product,
  onClose,
}: ProductModalProps) {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { colors } = useTheme();

  if (!product) return null;

  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const styles = StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.6)",
      justifyContent: "flex-end",
    },
    modalContainer: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      maxHeight: height * 0.85,
      paddingBottom: 20,
    },
    header: {
      position: "relative",
      paddingTop: 12,
      paddingHorizontal: 20,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    dragIndicator: {
      width: 40,
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
      alignSelf: "center",
      marginBottom: 12,
    },
    closeButton: {
      position: "absolute",
      top: 12,
      right: 20,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
    },
    scrollContent: {
      paddingBottom: 100,
    },
    imageContainer: {
      width: "100%",
      height: 280,
      position: "relative",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    categoryBadge: {
      position: "absolute",
      top: 16,
      left: 16,
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 12,
    },
    categoryText: {
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: "700",
    },
    content: {
      padding: 20,
    },
    nameSection: {
      marginBottom: 16,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    ratingText: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
    },
    reviewCount: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    priceSection: {
      backgroundColor: colors.background,
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
    },
    priceLabel: {
      fontSize: 13,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    price: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.primary,
    },
    descriptionSection: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 8,
    },
    description: {
      fontSize: 15,
      color: colors.textSecondary,
      lineHeight: 24,
    },
    featuresSection: {
      marginBottom: 20,
    },
    featureItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 12,
    },
    featureIconContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.primary + "20",
      justifyContent: "center",
      alignItems: "center",
    },
    featureText: {
      fontSize: 14,
      color: colors.text,
      flex: 1,
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.card,
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      elevation: 8,
    },
    footerContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    cartStatus: {
      flex: 1,
    },
    cartStatusText: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    cartQuantity: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.success,
    },
    addButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: 12,
      gap: 8,
      elevation: 2,
    },
    addButtonInCart: {
      backgroundColor: colors.success,
    },
    addButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContainer}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            <View style={styles.dragIndicator} />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
              {product.category && (
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{product.category}</Text>
                </View>
              )}
            </View>

            <View style={styles.content}>
              <View style={styles.nameSection}>
                <Text style={styles.name}>{product.name}</Text>
                <View style={styles.ratingRow}>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={18} color="#FFC107" />
                    <Text style={styles.ratingText}>4.5</Text>
                  </View>
                  <Text style={styles.reviewCount}>(128 reviews)</Text>
                </View>
              </View>

              <View style={styles.priceSection}>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.price}>₱{product.price.toLocaleString()}</Text>
              </View>

              <View style={styles.descriptionSection}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>{product.description}</Text>
              </View>

              <View style={styles.featuresSection}>
                <Text style={styles.sectionTitle}>Features</Text>
                <View style={styles.featureItem}>
                  <View style={styles.featureIconContainer}>
                    <Ionicons name="shield-checkmark" size={18} color={colors.primary} />
                  </View>
                  <Text style={styles.featureText}>1 Year Warranty</Text>
                </View>
                <View style={styles.featureItem}>
                  <View style={styles.featureIconContainer}>
                    <Ionicons name="car" size={18} color={colors.primary} />
                  </View>
                  <Text style={styles.featureText}>Free Shipping</Text>
                </View>
                <View style={styles.featureItem}>
                  <View style={styles.featureIconContainer}>
                    <Ionicons name="arrow-back" size={18} color={colors.primary} />
                  </View>
                  <Text style={styles.featureText}>30-Day Return Policy</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.footerContent}>
              {inCart && (
                <View style={styles.cartStatus}>
                  <Text style={styles.cartStatusText}>In Cart</Text>
                  <Text style={styles.cartQuantity}>{quantity} item(s)</Text>
                </View>
              )}
              <TouchableOpacity
                style={[styles.addButton, inCart && styles.addButtonInCart]}
                onPress={handleAddToCart}
                activeOpacity={0.8}
              >
                <Ionicons name={inCart ? "checkmark" : "cart"} size={20} color="#FFFFFF" />
                <Text style={styles.addButtonText}>
                  {inCart ? "Add More" : "Add to Cart"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}