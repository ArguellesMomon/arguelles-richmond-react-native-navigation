import { StyleSheet } from "react-native";
import { ThemeColors } from "../../types";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.card,
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
    clearButtonPressed: {
      opacity: 0.7,
      transform: [{ scale: 0.97 }],
    },
    clearButtonText: {
      color: colors.shadow,
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

    // ===== SELECTION ACTIONS =====
    selectionActionsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 12,
    },
    selectAllButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 8,
    },
    selectAllButtonPressed: {
      opacity: 0.7,
    },
    selectAllCheckbox: {
      width: 24,
      height: 24,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    selectAllCheckboxSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    selectAllText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },
    deleteSelectedButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 10,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.danger,
    },
    deleteSelectedButtonPressed: {
      opacity: 0.7,
      transform: [{ scale: 0.97 }],
    },
    deleteSelectedText: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.shadow,
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
    cartItemSelected: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    cartItemPressed: {
      opacity: 0.9,
    },

    // ===== CHECKBOX =====
    checkbox: {
      width: 28,
      height: 28,
      borderRadius: 7,
      borderWidth: 2,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      marginRight: 12,
      alignSelf: "center",
    },
    checkboxSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    checkboxPressed: {
      transform: [{ scale: 0.95 }],
    },

    // ===== ITEM IMAGE =====
    itemImageContainer: {
      marginRight: 12,
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: colors.background,
    },
    itemImage: {
      width: 90,
      height: 90,
      borderRadius: 16,
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
    quantityButtonPressed: {
      transform: [{ scale: 0.95 }],
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
    removeButtonPressed: {
      opacity: 0.6,
      transform: [{ scale: 0.9 }],
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
    shopButtonPressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
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

    // ===== SELECTED INFO =====
    selectedInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: colors.success + "15",
      padding: 12,
      borderRadius: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.success + "30",
    },
    selectedInfoText: {
      flex: 1,
      fontSize: 14,
      color: colors.success,
      fontWeight: "600",
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
      backgroundColor: colors.primary,
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
      color: colors.shadow,
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
    checkoutButtonDisabled: {
      backgroundColor: colors.textSecondary,
      opacity: 0.5,
    },
    checkoutButtonPressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
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