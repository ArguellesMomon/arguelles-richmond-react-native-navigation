import { useState } from "react";
import { Product } from "../types";

export default function useProductModal() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [visible, setVisible] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return { selectedProduct, visible, openModal, closeModal };
}