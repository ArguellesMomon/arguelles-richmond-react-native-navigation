import { StyleSheet } from "react-native";
import { ThemeColors } from "../../types";

/**
 * Create styles for Cart Screen with modern shopping app design
 * @param colors - Theme colors object
 */
export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    // ===== CONTAINER =====
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    // ===== HEADER =====
    headerContainer: {
      backgroundColor: colors.card,
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
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 12,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text,
      letterSpacing: 0.3,
    },
    clearButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 12,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.danger,
    },
    clearButtonText: {
      color: colors.danger,
      fontSize: 14,
      fontWeight: "600",
    },
    itemsCountContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 8,
      gap: 8,
    },
    itemsCount: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: "500",
    },

    // ===== LIST =====
    listContent: {
      paddingTop: 16,
      paddingBottom: 16,
    },

    // ===== CART ITEM CARD =====
    cartItem: {
      flexDirection: "row",
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginBottom: 12,
      borderRadius: 20,
      padding: 12,
      elevation: 3,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cartItemRemoving: {
      opacity: 0.5,
    },

    // ===== ITEM IMAGE =====
    itemImageContainer: {
      marginRight: 12,
    },
    itemImagePlaceholder: {
      width: 90,
      height: 90,
      backgroundColor: colors.background,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },

    // ===== ITEM DETAILS =====
    itemDetails: {
      flex: 1,
      justifyContent: "space-between",
      paddingVertical: 4,
    },
    itemName: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 6,
      lineHeight: 22,
    },
    itemPrice: {
      fontSize: 13,
      color: colors.textSecondary,
      marginBottom: 8,
    },

    // ===== QUANTITY CONTROLS =====
    quantityRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    quantityControls: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    quantityButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    quantityButtonIncrease: {
      backgroundColor: colors.success,
    },
    quantityButtonDecrease: {
      backgroundColor: colors.textSecondary,
    },
    quantityButtonWarning: {
      backgroundColor: colors.danger,
    },
    quantityButtonDisabled: {
      opacity: 0.4,
    },
    quantityDisplay: {
      minWidth: 40,
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: colors.background,
      borderRadius: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    quantityText: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },

    // ===== ITEM TOTAL =====
    itemTotalContainer: {
      alignItems: "flex-end",
    },
    itemTotalLabel: {
      fontSize: 11,
      color: colors.textSecondary,
      marginBottom: 2,
    },
    itemTotal: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.primary,
    },

    // ===== REMOVE BUTTON =====
    removeButton: {
      position: "absolute",
      top: 12,
      right: 12,
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },

    // ===== EMPTY STATE =====
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
      paddingVertical: 60,
    },
    emptyIconContainer: {
      marginBottom: 24,
      opacity: 0.3,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 12,
    },
    emptySubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: "center",
      marginBottom: 32,
      lineHeight: 24,
    },
    shopButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: colors.primary,
      paddingVertical: 14,
      paddingHorizontal: 28,
      borderRadius: 16,
      elevation: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
    },
    shopButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },

    // ===== FOOTER =====
    footer: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginTop: 20,
      marginBottom: 16,
      borderRadius: 20,
      padding: 20,
      elevation: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },

    // ===== PRICE BREAKDOWN =====
    priceBreakdown: {
      marginBottom: 20,
    },
    priceRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    priceLabel: {
      fontSize: 15,
      color: colors.textSecondary,
      fontWeight: "500",
    },
    priceValue: {
      fontSize: 15,
      color: colors.text,
      fontWeight: "600",
    },
    shippingRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    freeBadge: {
      backgroundColor: colors.success,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 8,
    },
    freeBadgeText: {
      color: "#FFFFFF",
      fontSize: 11,
      fontWeight: "bold",
    },
    freePrice: {
      color: colors.success,
    },
    freeShippingContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: colors.background,
      padding: 12,
      borderRadius: 12,
      marginTop: 4,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.success,
    },
    freeShippingNote: {
      flex: 1,
      fontSize: 13,
      color: colors.success,
      fontWeight: "600",
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 16,
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    totalLabel: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    totalPrice: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.primary,
    },

    // ===== CHECKOUT BUTTON =====
    checkoutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 16,
      elevation: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      marginBottom: 12,
    },
    checkoutButtonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
      letterSpacing: 0.5,
    },

    // ===== SECURE BADGE =====
    secureRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    secureText: {
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: "500",
    },
  });