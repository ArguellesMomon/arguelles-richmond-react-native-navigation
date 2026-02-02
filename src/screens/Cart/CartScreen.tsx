import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { createStyles } from "./styles";
import { CartItem } from "../../types";

const MAX_QUANTITY = 99;
const MIN_QUANTITY = 1;
const FREE_SHIPPING_THRESHOLD = 1000;
const SHIPPING_FEE = 50;

export default function CartScreen({ navigation }: any) {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();
  const { colors, isDark } = useTheme();
  const styles = createStyles(colors);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  // Validate quantity before increasing
  const handleIncrease = (item: CartItem) => {
    if (item.quantity >= MAX_QUANTITY) {
      Alert.alert(
        "Maximum Quantity Reached",
        `You can only add up to ${MAX_QUANTITY} items per product.`,
        [{ text: "OK" }]
      );
      return;
    }
    increaseQty(item.id);
  };

  // Validate and show confirmation before removing
  const handleDecrease = (item: CartItem) => {
    if (item.quantity === MIN_QUANTITY) {
      // Show confirmation dialog before removing
      Alert.alert(
        "Remove Item",
        `Remove "${item.name}" from cart?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => {
              setRemovingItemId(item.id);
              setTimeout(() => {
                decreaseQty(item.id);
                setRemovingItemId(null);
              }, 200);
            },
          },
        ]
      );
    } else {
      decreaseQty(item.id);
    }
  };

  // Handle direct item removal
  const handleRemoveItem = (item: CartItem) => {
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove "${item.name}" from your cart?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setRemovingItemId(item.id);
            setTimeout(() => {
              removeItem(item.id);
              setRemovingItemId(null);
            }, 200);
          },
        },
      ]
    );
  };

  // Clear entire cart with confirmation
  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from your cart?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => clearCart(),
        },
      ]
    );
  };

  // Validate before checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert(
        "Cart is Empty",
        "Please add some items to your cart before checking out.",
        [{ text: "OK" }]
      );
      return;
    }

    if (totalPrice < 1) {
      Alert.alert(
        "Invalid Total",
        "Total amount must be greater than ₱0.",
        [{ text: "OK" }]
      );
      return;
    }

    // Navigate to checkout
    navigation.navigate("Checkout");
  };

  const renderCartItem = ({ item }: { item: CartItem }) => {
    const itemTotal = item.price * item.quantity;
    const isRemoving = removingItemId === item.id;

    return (
      <View
        style={[
          styles.cartItem,
          isRemoving && styles.cartItemRemoving,
        ]}
      >
        {/* Product Image */}
        <View style={styles.itemImageContainer}>
          <View style={styles.itemImagePlaceholder}>
            <Ionicons name="cube-outline" size={40} color={colors.textSecondary} />
          </View>
        </View>

        {/* Product Details */}
        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>

          <Text style={styles.itemPrice}>₱{item.price.toFixed(2)} each</Text>

          {/* Quantity Controls */}
          <View style={styles.quantityRow}>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={[
                  styles.quantityButton,
                  styles.quantityButtonDecrease,
                  item.quantity === MIN_QUANTITY && styles.quantityButtonWarning,
                ]}
                onPress={() => handleDecrease(item)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.quantity === MIN_QUANTITY ? "trash-outline" : "remove"}
                  size={18}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>{item.quantity}</Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.quantityButton,
                  styles.quantityButtonIncrease,
                  item.quantity >= MAX_QUANTITY && styles.quantityButtonDisabled,
                ]}
                onPress={() => handleIncrease(item)}
                activeOpacity={0.7}
                disabled={item.quantity >= MAX_QUANTITY}
              >
                <Ionicons name="add" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Item Subtotal */}
            <View style={styles.itemTotalContainer}>
              <Text style={styles.itemTotalLabel}>Subtotal</Text>
              <Text style={styles.itemTotal}>₱{itemTotal.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Remove Button */}
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item)}
          activeOpacity={0.7}
        >
          <Ionicons name="close-circle" size={24} color={colors.danger} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="cart-outline" size={100} color={colors.textSecondary} />
      </View>
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>
        Looks like you haven't added anything yet
      </Text>
      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => navigation.navigate("Home")}
        activeOpacity={0.8}
      >
        <Ionicons name="bag-handle" size={20} color="#FFFFFF" />
        <Text style={styles.shopButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        

        <Text style={styles.headerTitle}>Shopping Cart</Text>

        {cart.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearCart}
            activeOpacity={0.7}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}

        {cart.length === 0 && <View style={{ width: 60 }} />}
      </View>

      {cart.length > 0 && (
        <View style={styles.itemsCountContainer}>
          <Ionicons name="cube" size={20} color={colors.primary} />
          <Text style={styles.itemsCount}>
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </Text>
        </View>
      )}
    </View>
  );

  const renderFooter = () => {
    if (cart.length === 0) return null;

    const shippingFee = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const finalTotal = totalPrice + shippingFee;

    return (
      <View style={styles.footer}>
        {/* Price Breakdown */}
        <View style={styles.priceBreakdown}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>₱{totalPrice.toFixed(2)}</Text>
          </View>

          <View style={styles.priceRow}>
            <View style={styles.shippingRow}>
              <Text style={styles.priceLabel}>Shipping Fee</Text>
              {shippingFee === 0 && (
                <View style={styles.freeBadge}>
                  <Text style={styles.freeBadgeText}>FREE</Text>
                </View>
              )}
            </View>
            <Text style={[styles.priceValue, shippingFee === 0 && styles.freePrice]}>
              {shippingFee === 0 ? "FREE" : `₱${shippingFee.toFixed(2)}`}
            </Text>
          </View>

          {totalPrice < FREE_SHIPPING_THRESHOLD && totalPrice > 0 && (
            <View style={styles.freeShippingContainer}>
              <Ionicons name="gift" size={16} color={colors.success} />
              <Text style={styles.freeShippingNote}>
                Add ₱{(FREE_SHIPPING_THRESHOLD - totalPrice).toFixed(2)} more for FREE shipping!
              </Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>₱{finalTotal.toFixed(2)}</Text>
          </View>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
          activeOpacity={0.8}
        >
          <Ionicons name="card" size={22} color="#FFFFFF" />
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>

        {/* Secure Checkout Badge */}
        <View style={styles.secureRow}>
          <Ionicons name="shield-checkmark" size={16} color={colors.success} />
          <Text style={styles.secureText}>Secure Checkout</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      {renderHeader()}

      {cart.length === 0 ? (
        renderEmptyCart()
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={renderCartItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
  );
}