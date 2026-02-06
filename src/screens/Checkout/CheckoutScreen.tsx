import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { createStyles } from "./styles";
import { CartItem } from "../../types";

const FREE_SHIPPING_THRESHOLD = 1000;
const SHIPPING_FEE = 50;
const TAX_RATE = 0.12; // 12% VAT

interface FormData {
  fullName: string;
  phone: string;
  address: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  address?: string;
}

export default function CheckoutScreen({ navigation, route }: any) {
  const { clearCart, removeItem } = useCart();
  const { colors, isDark } = useTheme();
  const styles = createStyles(colors);

  // Get selected items from navigation params
  const selectedItems: CartItem[] = route?.params?.selectedItems || [];
  
  // Calculate totals for selected items only
  const selectedTotalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card" | null>(null);
  const [hasCheckedOut, setHasCheckedOut] = useState(false); // Track if order is placed

  // Reset hasCheckedOut when component mounts or selectedItems change
  useEffect(() => {
    setHasCheckedOut(false);
  }, [selectedItems]);

  // Validate phone number (Philippine format)
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(09|\+639)\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  // Validate all form fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid Philippine phone number (09xxxxxxxxx)";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please enter a complete address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate payment method
  const validatePaymentMethod = (): boolean => {
    if (!paymentMethod) {
      Alert.alert(
        "Payment Method Required",
        "Please select a payment method to continue.",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  // Validate selected items
  const validateSelectedItems = (): boolean => {
    if (selectedItems.length === 0) {
      Alert.alert(
        "No Items Selected",
        "No items were selected for checkout.",
        [
          {
            text: "Go Back",
            onPress: () => navigation.goBack(),
          },
        ]
      );
      return false;
    }
    return true;
  };

  // Validate if order has already been placed
  const validateNotAlreadyCheckedOut = (): boolean => {
    if (hasCheckedOut) {
      Alert.alert(
        "Order Already Placed",
        "You have already placed this order. Please go back to cart to make a new order.",
        [
          {
            text: "Go to Cart",
            onPress: () => navigation.navigate("Cart"),
          },
          {
            text: "Go Home",
            onPress: () => navigation.navigate("Home"),
          },
        ]
      );
      return false;
    }
    return true;
  };

  // Main checkout handler
  const handleCheckout = async () => {
    // Check if already checked out
    if (!validateNotAlreadyCheckedOut()) return;

    // Validate selected items
    if (!validateSelectedItems()) return;

    // Validate form
    if (!validateForm()) {
      Alert.alert(
        "Incomplete Information",
        "Please fill in all required fields correctly.",
        [{ text: "OK" }]
      );
      return;
    }

    // Validate payment method
    if (!validatePaymentMethod()) return;

    // Show confirmation
    const shippingFee = selectedTotalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const tax = selectedTotalPrice * TAX_RATE;
    const finalTotal = selectedTotalPrice + shippingFee + tax;

    Alert.alert(
      "Confirm Order",
      `Items: ${selectedItems.length}\nTotal Amount: ₱${finalTotal.toFixed(2)}\nPayment: ${
        paymentMethod === "cod" ? "Cash on Delivery" : "Credit/Debit Card"
      }\n\nProceed with checkout?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => processCheckout(finalTotal),
        },
      ]
    );
  };

  // Process the checkout
  const processCheckout = async (total: number) => {
    // Double check to prevent race condition
    if (hasCheckedOut) {
      Alert.alert(
        "Order Already Placed",
        "This order has already been processed.",
        [{ text: "OK" }]
      );
      return;
    }

    setIsProcessing(true);
    setHasCheckedOut(true); // Mark as checked out immediately

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);

      // Remove only the selected items from cart
      selectedItems.forEach((item) => {
        removeItem(item.id);
      });

      Alert.alert(
        "Order Placed Successfully! 🎉",
        `Thank you for your purchase, ${formData.fullName}!\n\n` +
        `Items Ordered: ${selectedItems.length}\n` +
        `Order Total: ₱${total.toFixed(2)}`,
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Home");
            },
          },
        ],
        { cancelable: false }
      );
    }, 2000);
  };

  // Update form field
  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const renderOrderSummary = () => {
    const shippingFee = selectedTotalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const tax = selectedTotalPrice * TAX_RATE;
    const finalTotal = selectedTotalPrice + shippingFee + tax;

    return (
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Ionicons name="receipt-outline" size={24} color={colors.primary} />
          <Text style={styles.summaryTitle}>Order Summary</Text>
        </View>

        <View style={styles.summaryContent}>
          {selectedItems.map((item) => (
            <View key={item.id} style={styles.summaryItem}>
              <Text style={styles.summaryItemName} numberOfLines={1}>
                {item.name} × {item.quantity}
              </Text>
              <Text style={styles.summaryItemPrice}>
                ₱{(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₱{selectedTotalPrice.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping Fee</Text>
            <Text style={[styles.summaryValue, shippingFee === 0 && styles.freeText]}>
              {shippingFee === 0 ? "FREE" : `₱${shippingFee.toFixed(2)}`}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax (12%)</Text>
            <Text style={styles.summaryValue}>₱{tax.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₱{finalTotal.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderFormField = (
    field: keyof FormData,
    label: string,
    placeholder: string,
    icon: string,
    keyboardType: any = "default",
    multiline: boolean = false
  ) => (
    <View style={styles.formGroup}>
      <Text style={styles.formLabel}>{label}</Text>
      <View style={[styles.inputContainer, errors[field] && styles.inputError]}>
        <Ionicons name={icon as any} size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.input, multiline && styles.textArea]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={formData[field]}
          onChangeText={(value) => updateField(field, value)}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          editable={!hasCheckedOut} // Disable input after checkout
        />
      </View>
      {errors[field] && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={14} color={colors.danger} />
          <Text style={styles.errorText}>{errors[field]}</Text>
        </View>
      )}
    </View>
  );

  const renderPaymentMethods = () => (
    <View style={styles.paymentSection}>
      <Text style={styles.sectionTitle}>Payment Method</Text>

      <Pressable
        style={({ pressed }) => [
          styles.paymentOption,
          paymentMethod === "cod" && styles.paymentOptionSelected,
          pressed && !hasCheckedOut && styles.paymentOptionPressed,
          hasCheckedOut && styles.paymentOptionDisabled,
        ]}
        onPress={() => !hasCheckedOut && setPaymentMethod("cod")}
        disabled={hasCheckedOut}
      >
        <View style={styles.paymentIconContainer}>
          <Ionicons name="cash-outline" size={24} color={colors.text} />
        </View>
        <View style={styles.paymentDetails}>
          <Text style={styles.paymentTitle}>Cash on Delivery</Text>
          <Text style={styles.paymentSubtitle}>Pay when you receive</Text>
        </View>
        <View
          style={[
            styles.radioButton,
            paymentMethod === "cod" && styles.radioButtonSelected,
          ]}
        >
          {paymentMethod === "cod" && <View style={styles.radioButtonInner} />}
        </View>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.paymentOption,
          paymentMethod === "card" && styles.paymentOptionSelected,
          pressed && !hasCheckedOut && styles.paymentOptionPressed,
          hasCheckedOut && styles.paymentOptionDisabled,
        ]}
        onPress={() => !hasCheckedOut && setPaymentMethod("card")}
        disabled={hasCheckedOut}
      >
        <View style={styles.paymentIconContainer}>
          <Ionicons name="card-outline" size={24} color={colors.text} />
        </View>
        <View style={styles.paymentDetails}>
          <Text style={styles.paymentTitle}>Credit/Debit Card</Text>
          <Text style={styles.paymentSubtitle}>Secure payment</Text>
        </View>
        <View
          style={[
            styles.radioButton,
            paymentMethod === "card" && styles.radioButtonSelected,
          ]}
        >
          {paymentMethod === "card" && <View style={styles.radioButtonInner} />}
        </View>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      {/* Header */}
           <View style={styles.header}>
  <View style={{ width: 44 }}>

  </View>

  <View style={{ flex: 1, alignItems: "center" }}>
    <Text style={styles.headerTitle}>Checkout</Text>
  </View>

  <View style={{ width: 44 }} />
</View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Order Already Placed Banner */}
          {hasCheckedOut && (
            <View style={styles.checkedOutBanner}>
              <Ionicons name="checkmark-circle" size={24} color={colors.success} />
              <Text style={styles.checkedOutBannerText}>
                Order has been placed! Form is now locked.
              </Text>
            </View>
          )}

          {/* Order Summary */}
          {renderOrderSummary()}

          {/* Shipping Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping Information</Text>

            {renderFormField("fullName", "Full Name", "Juan Dela Cruz", "person-outline")}
            {renderFormField("phone", "Phone Number", "09123456789", "call-outline", "phone-pad")}
            {renderFormField("address", "Address", "House No., Street, Barangay", "home-outline", "default", true)}
          </View>

          {/* Payment Methods */}
          {renderPaymentMethods()}

          {/* Terms Notice */}
          <View style={styles.termsContainer}>
            <Ionicons name="shield-checkmark" size={16} color={colors.success} />
            <Text style={styles.termsText}>
              Your payment is secure and your data is protected
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Checkout Button */}
      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.checkoutButton,
            (isProcessing || hasCheckedOut) && styles.checkoutButtonDisabled,
            pressed && !isProcessing && !hasCheckedOut && styles.checkoutButtonPressed,
          ]}
          onPress={handleCheckout}
          disabled={isProcessing || hasCheckedOut}
        >
          {isProcessing ? (
            <>
              <Ionicons name="hourglass-outline" size={22} color="#FFFFFF" />
              <Text style={styles.checkoutButtonText}>Processing...</Text>
            </>
          ) : hasCheckedOut ? (
            <>
              <Ionicons name="checkmark-done" size={22} color="#FFFFFF" />
              <Text style={styles.checkoutButtonText}>Order Placed</Text>
            </>
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
              <Text style={styles.checkoutButtonText}>
                Place Order ({selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""})
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}