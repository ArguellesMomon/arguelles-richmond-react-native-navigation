import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
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
  
  // Track selected items for checkout
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Select/Deselect individual item
  const toggleSelectItem = (itemId: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Select/Deselect all items
  const toggleSelectAll = () => {
    if (selectedItems.size === cart.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cart.map((item) => item.id)));
    }
  };

  // Calculate totals for selected items only
  const getSelectedTotals = () => {
    const selectedCartItems = cart.filter((item) => selectedItems.has(item.id));
    const subtotal = selectedCartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const itemCount = selectedCartItems.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, itemCount, selectedCount: selectedCartItems.length };
  };

  const { subtotal: selectedSubtotal, itemCount: selectedItemCount, selectedCount } = getSelectedTotals();

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

  const handleDecrease = (item: CartItem) => {
    if (item.quantity === MIN_QUANTITY) {
      Alert.alert(
        "Remove Item",
        `Remove "${item.name}" from cart?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => {
              setRemovingItemId(item.id);
              setSelectedItems((prev) => {
                const newSet = new Set(prev);
                newSet.delete(item.id);
                return newSet;
              });
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

  const handleRemoveItem = (item: CartItem) => {
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove "${item.name}" from your cart?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setRemovingItemId(item.id);
            setSelectedItems((prev) => {
              const newSet = new Set(prev);
              newSet.delete(item.id);
              return newSet;
            });
            setTimeout(() => {
              removeItem(item.id);
              setRemovingItemId(null);
            }, 200);
          },
        },
      ]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedItems.size === 0) {
      Alert.alert("No Items Selected", "Please select items to delete.", [{ text: "OK" }]);
      return;
    }

    Alert.alert(
      "Delete Selected Items",
      `Remove ${selectedItems.size} selected item${selectedItems.size > 1 ? "s" : ""} from cart?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            selectedItems.forEach((itemId) => removeItem(itemId));
            setSelectedItems(new Set());
          },
        },
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => {
            clearCart();
            setSelectedItems(new Set());
          },
        },
      ]
    );
  };

  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      Alert.alert("No Items Selected", "Please select items to checkout.", [{ text: "OK" }]);
      return;
    }

    if (selectedSubtotal < 1) {
      Alert.alert("Invalid Total", "Total amount must be greater than ₱0.", [{ text: "OK" }]);
      return;
    }

    const selectedCartItems = cart.filter((item) => selectedItems.has(item.id));
    navigation.navigate("Checkout", { selectedItems: selectedCartItems });
  };

  const renderCartItem = ({ item }: { item: CartItem }) => {
    const itemTotal = item.price * item.quantity;
    const isRemoving = removingItemId === item.id;
    const isSelected = selectedItems.has(item.id);

    return (
      <Pressable
        style={({ pressed }) => [
          styles.cartItem,
          isRemoving && styles.cartItemRemoving,
          isSelected && styles.cartItemSelected,
          pressed && styles.cartItemPressed,
        ]}
        onPress={() => toggleSelectItem(item.id)}
      >
        {/* Checkbox */}
        <Pressable
          style={({ pressed }) => [
            styles.checkbox,
            isSelected && styles.checkboxSelected,
            pressed && styles.checkboxPressed,
          ]}
          onPress={() => toggleSelectItem(item.id)}
        >
          {isSelected && <Ionicons name="checkmark" size={18} color="#FFFFFF" />}
        </Pressable>

        {/* Product Image */}
        <View style={styles.itemImageContainer}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
          ) : (
            <View style={styles.itemImagePlaceholder}>
              <Ionicons name="cube-outline" size={40} color={colors.textSecondary} />
            </View>
          )}
        </View>

        {/* Product Details */}
        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.itemPrice}>₱{item.price.toFixed(2)} each</Text>

          <View style={styles.quantityRow}>
            <View style={styles.quantityControls}>
              <Pressable
                style={({ pressed }) => [
                  styles.quantityButton,
                  styles.quantityButtonDecrease,
                  item.quantity === MIN_QUANTITY && styles.quantityButtonWarning,
                  pressed && styles.quantityButtonPressed,
                ]}
                onPress={() => handleDecrease(item)}
              >
                <Ionicons
                  name={item.quantity === MIN_QUANTITY ? "trash-outline" : "remove"}
                  size={18}
                  color="#FFFFFF"
                />
              </Pressable>

              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>{item.quantity}</Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.quantityButton,
                  styles.quantityButtonIncrease,
                  item.quantity >= MAX_QUANTITY && styles.quantityButtonDisabled,
                  pressed && styles.quantityButtonPressed,
                ]}
                onPress={() => handleIncrease(item)}
                disabled={item.quantity >= MAX_QUANTITY}
              >
                <Ionicons name="add" size={18} color="#FFFFFF" />
              </Pressable>
            </View>

            <View style={styles.itemTotalContainer}>
              <Text style={styles.itemTotalLabel}>Subtotal</Text>
              <Text style={styles.itemTotal}>₱{itemTotal.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Remove Button */}
        <Pressable
          style={({ pressed }) => [
            styles.removeButton,
            pressed && styles.removeButtonPressed,
          ]}
          onPress={() => handleRemoveItem(item)}
        >
          <Ionicons name="close-circle" size={24} color={colors.danger} />
        </Pressable>
      </Pressable>
    );
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="cart-outline" size={100} color={colors.textSecondary} />
      </View>
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>Looks like you haven't added anything yet</Text>
      <Pressable
        style={({ pressed }) => [styles.shopButton, pressed && styles.shopButtonPressed]}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="bag-handle" size={20} color="#FFFFFF" />
        <Text style={styles.shopButtonText}>Start Shopping</Text>
      </Pressable>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>

        <Text style={styles.headerTitle}>Shopping Cart</Text>

        {cart.length > 0 ? (
          <Pressable
            style={({ pressed }) => [styles.clearButton, pressed && styles.clearButtonPressed]}
            onPress={handleClearCart}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </Pressable>
        ) : (
          <View style={{ width: 60 }} />
        )}
      </View>

      {cart.length > 0 && (
        <>
          <View style={styles.itemsCountContainer}>
            <Ionicons name="cube" size={20} color={colors.primary} />
            <Text style={styles.itemsCount}>
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </Text>
          </View>

          <View style={styles.selectionActionsContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.selectAllButton,
                pressed && styles.selectAllButtonPressed,
              ]}
              onPress={toggleSelectAll}
            >
              <View
                style={[
                  styles.selectAllCheckbox,
                  selectedItems.size === cart.length && styles.selectAllCheckboxSelected,
                ]}
              >
                {selectedItems.size === cart.length && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.selectAllText}>
                {selectedItems.size === cart.length ? "Deselect All" : "Select All"}
              </Text>
            </Pressable>

            {selectedItems.size > 0 && (
              <Pressable
                style={({ pressed }) => [
                  styles.deleteSelectedButton,
                  pressed && styles.deleteSelectedButtonPressed,
                ]}
                onPress={handleDeleteSelected}
              >
                <Ionicons name="trash-outline" size={18} color={colors.shadow} />
                <Text style={styles.deleteSelectedText}>Delete ({selectedItems.size})</Text>
              </Pressable>
            )}
          </View>
        </>
      )}
    </View>
  );

  const renderFooter = () => {
    if (cart.length === 0) return null;

    const shippingFee = selectedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const finalTotal = selectedSubtotal + shippingFee;

    return (
      <View style={styles.footer}>
        {selectedItems.size > 0 && (
          <View style={styles.selectedInfoContainer}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.selectedInfoText}>
              {selectedCount} product{selectedCount > 1 ? "s" : ""} ({selectedItemCount} item
              {selectedItemCount > 1 ? "s" : ""}) selected
            </Text>
          </View>
        )}

        <View style={styles.priceBreakdown}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>₱{selectedSubtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.priceRow}>
            <View style={styles.shippingRow}>
              <Text style={styles.priceLabel}>Shipping Fee</Text>
              {shippingFee === 0 && selectedSubtotal > 0 && (
                <View style={styles.freeBadge}>
                  <Text style={styles.freeBadgeText}>FREE</Text>
                </View>
              )}
            </View>
            <Text
              style={[styles.priceValue, shippingFee === 0 && selectedSubtotal > 0 && styles.freePrice]}
            >
              {selectedSubtotal > 0 ? (shippingFee === 0 ? "FREE" : `₱${shippingFee.toFixed(2)}`) : "₱0.00"}
            </Text>
          </View>

          {selectedSubtotal < FREE_SHIPPING_THRESHOLD && selectedSubtotal > 0 && (
            <View style={styles.freeShippingContainer}>
              <Ionicons name="gift" size={16} color={colors.shadow} />
              <Text style={styles.freeShippingNote}>
                Add ₱{(FREE_SHIPPING_THRESHOLD - selectedSubtotal).toFixed(2)} more for FREE shipping!
              </Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>₱{finalTotal.toFixed(2)}</Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.checkoutButton,
            selectedItems.size === 0 && styles.checkoutButtonDisabled,
            pressed && selectedItems.size > 0 && styles.checkoutButtonPressed,
          ]}
          onPress={handleCheckout}
          disabled={selectedItems.size === 0}
        >
          <Ionicons name="card" size={22} color="#FFFFFF" />
          <Text style={styles.checkoutButtonText}>
            {selectedItems.size > 0
              ? `Checkout (${selectedCount} item${selectedCount > 1 ? "s" : ""})`
              : "Select items to checkout"}
          </Text>
        </Pressable>

        <View style={styles.secureRow}>
          <Ionicons name="shield-checkmark" size={16} color={colors.success} />
          <Text style={styles.secureText}>Secure Checkout</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.background} />

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