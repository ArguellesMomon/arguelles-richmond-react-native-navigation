import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { createStyles } from "./styles";

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
  const { addToCart, increaseQty, decreaseQty, isInCart, getItemQuantity } = useCart();
  const { colors } = useTheme();

  // Create styles using colors from theme
  const styles = createStyles(colors);

  if (!product) return null;

  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleIncrease = () => {
    increaseQty(product.id);
  };

  const handleDecrease = () => {
    decreaseQty(product.id);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        {/* Backdrop - Tap to close */}
        <Pressable style={{ flex: 1 }} onPress={onClose} />

        {/* Modal Content */}
        <View style={styles.modalContainer}>
          {/* Header with close button */}
          <View style={styles.header}>
            <View style={styles.dragIndicator} />
            <Pressable
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.closeButtonPressed,
              ]}
              onPress={onClose}
            >
              <Ionicons name="close" size={24} color={colors.text} />
            </Pressable>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            bounces={true}
            scrollEventThrottle={16}
          >
            {/* Product Image */}
            <View style={styles.imageContainer}>
              {product.image ? (
                <Image
                  source={{ uri: product.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons
                    name="image-outline"
                    size={80}
                    color={colors.textSecondary}
                  />
                </View>
              )}
              {product.category && (
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{product.category}</Text>
                </View>
              )}
            </View>

            {/* Product Details */}
            <View style={styles.content}>
              {/* Name and Rating */}
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

              {/* Price */}
              <View style={styles.priceSection}>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.price}>
                  ₱{product.price.toLocaleString()}
                </Text>
              </View>

              {/* Description */}
              <View style={styles.descriptionSection}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>
                  {product.description ||
                    "Experience premium quality with this exceptional product. " +
                      "Designed with attention to detail and built to last, " +
                      "this item combines style, functionality, and durability. " +
                      "Perfect for everyday use or special occasions."}
                </Text>
              </View>

              {/* Features */}
              <View style={styles.featuresSection}>
                <Text style={styles.sectionTitle}>Features</Text>
                <View style={styles.featureItem}>
                  <View style={styles.featureIconContainer}>
                    <Ionicons
                      name="shield-checkmark"
                      size={18}
                      color={colors.primary}
                    />
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
                    <Ionicons
                      name="arrow-back"
                      size={18}
                      color={colors.primary}
                    />
                  </View>
                  <Text style={styles.featureText}>30-Day Return Policy</Text>
                </View>
                <View style={styles.featureItem}>
                  <View style={styles.featureIconContainer}>
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={colors.primary}
                    />
                  </View>
                  <Text style={styles.featureText}>100% Authentic</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Fixed Footer with Compact Controls */}
          <View style={styles.footer}>
            <View style={styles.footerContent}>
              {/* Price Info */}
              <View style={styles.priceInfo}>
                <Text style={styles.footerPriceLabel}>Total Price</Text>
                <Text style={styles.footerPrice}>
                  ₱{(product.price * (quantity || 1)).toLocaleString()}
                </Text>
              </View>

              {/* Cart Controls */}
              <View style={styles.cartControls}>
                {inCart ? (
                  <>
                    {/* Quantity Controls (when in cart) */}
                    <View style={styles.quantityContainer}>
                      <Pressable
                        style={({ pressed }) => [
                          styles.quantityButton,
                          pressed && styles.quantityButtonPressed,
                        ]}
                        onPress={handleDecrease}
                      >
                        <Ionicons name="remove" size={18} color="#FFFFFF" />
                      </Pressable>
                      <Text style={styles.quantityText}>{quantity}</Text>
                      <Pressable
                        style={({ pressed }) => [
                          styles.quantityButton,
                          pressed && styles.quantityButtonPressed,
                        ]}
                        onPress={handleIncrease}
                      >
                        <Ionicons name="add" size={18} color="#FFFFFF" />
                      </Pressable>
                    </View>

                    {/* Done Button */}
                    <Pressable
                      style={({ pressed }) => [
                        styles.doneButton,
                        pressed && styles.doneButtonPressed,
                      ]}
                      onPress={onClose}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#FFFFFF"
                      />
                      <Text style={styles.doneButtonText}>Done</Text>
                    </Pressable>
                  </>
                ) : (
                  // Add to Cart Button (when not in cart)
                  <Pressable
                    style={({ pressed }) => [
                      styles.addButton,
                      pressed && styles.addButtonPressed,
                    ]}
                    onPress={handleAddToCart}
                  >
                    <Ionicons name="cart" size={18} color="#FFFFFF" />
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}