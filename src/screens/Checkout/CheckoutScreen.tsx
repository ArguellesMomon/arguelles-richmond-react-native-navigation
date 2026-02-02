import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { useCart } from "../../context/CartContext";
import { styles } from "./styles";

export default function CheckoutScreen({ navigation }: any) {
  const { cart, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    Alert.alert("Checkout successful", "Thank you for your purchase!", [
      {
        text: "OK",
        onPress: () => {
          clearCart();
          navigation.navigate("Home");
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      {cart.map(item => (
        <Text key={item.id}>
          {item.name} - ₱{item.price * item.quantity}
        </Text>
      ))}

      <Text style={styles.total}>Total: ₱{totalPrice}</Text>
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
}
