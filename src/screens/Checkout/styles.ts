import { StyleSheet } from "react-native";
import { ThemeColors } from "../../types";

/**
 * Create styles for Checkout Screen with modern shopping app design
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
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.card,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      elevation: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    
    headerTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text,
      letterSpacing: 0.3,
    },

    // ===== CHECKED OUT BANNER =====
    checkedOutBanner: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.success + "20",
      padding: 16,
      borderRadius: 16,
      marginBottom: 20,
      borderWidth: 2,
      borderColor: colors.success,
      gap: 12,
    },
    checkedOutBannerText: {
      flex: 1,
      fontSize: 15,
      fontWeight: "bold",
      color: colors.success,
    },

    // ===== SCROLL CONTENT =====
    scrollContent: {
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 100,
    },

    // ===== ORDER SUMMARY CARD =====
    summaryCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      elevation: 3,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    summaryHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      gap: 10,
    },
    summaryTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
    },
    summaryContent: {
      gap: 8,
    },
    summaryItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 6,
    },
    summaryItemName: {
      flex: 1,
      fontSize: 14,
      color: colors.textSecondary,
      marginRight: 12,
    },
    summaryItemPrice: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },
    summaryDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 12,
    },
    summaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 6,
    },
    summaryLabel: {
      fontSize: 15,
      color: colors.textSecondary,
      fontWeight: "500",
    },
    summaryValue: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
    },
    freeText: {
      color: colors.success,
      fontWeight: "bold",
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 8,
    },
    totalLabel: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    totalValue: {
      fontSize: 26,
      fontWeight: "bold",
      color: colors.primary,
    },

    // ===== SECTIONS =====
    section: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      elevation: 3,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 16,
    },

    // ===== FORM FIELDS =====
    formGroup: {
      marginBottom: 20,
    },
    formLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 10,
    },
    inputError: {
      borderColor: colors.danger,
      borderWidth: 2,
    },
    input: {
      flex: 1,
      fontSize: 15,
      color: colors.text,
      padding: 0,
    },
    textArea: {
      minHeight: 80,
      textAlignVertical: "top",
    },
    errorContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 6,
      gap: 4,
    },
    errorText: {
      fontSize: 12,
      color: colors.danger,
      fontWeight: "500",
    },

    // ===== PAYMENT METHODS =====
    paymentSection: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      elevation: 3,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    paymentOption: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 2,
      borderColor: colors.border,
    },
    paymentOptionSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.background,
    },
    paymentOptionPressed: {
      opacity: 0.8,
      transform: [{ scale: 0.98 }],
    },
    paymentOptionDisabled: {
      opacity: 0.5,
    },
    paymentIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.card,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    paymentDetails: {
      flex: 1,
    },
    paymentTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.card,
      marginBottom: 4,
    },
    paymentSubtitle: {
      fontSize: 13,
      color: colors.card,
    },
    radioButton: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
    },
    radioButtonSelected: {
      borderColor: colors.shadow,
    },
    radioButtonInner: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.shadow,
    },

    // ===== TERMS =====
    termsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: colors.card,
      borderRadius: 16,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    termsText: {
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: "500",
    },

    // ===== FOOTER =====
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.card,
      padding: 20,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      elevation: 8,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
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
    },
    checkoutButtonDisabled: {
      backgroundColor: colors.textSecondary,
      opacity: 0.7,
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
  });