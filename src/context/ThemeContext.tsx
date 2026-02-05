import React, { createContext, useContext, useState } from "react";
import { ThemeColors } from "../types";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
  isDark: boolean;
}

const lightColors: ThemeColors = {
  background: '#ff7631',        // Light orange-tinted white
  card: '#FFFFFF',              // Pure white
  text: '#1A1A1A',              // Almost black
  textSecondary: '#666666',     // Gray
  border: '#ecc3b4',            // Light orange border
  primary: '#FF6B35',           // Vibrant orange
  primaryDark: '#E85A2A',       // Darker orange
  success: '#FF8C42',           // Orange success
  danger: '#D9534F',            // Red-orange danger
  shadow: '#ffffff',            // Black shadow
};

const darkColors: ThemeColors = {
  background: '#0A0A0A',        // True black
  card: '#1A1A1A',              // Dark gray-black
  text: '#FFFFFF',              // White text
  textSecondary: '#B0B0B0',     // Light gray
  border: '#2A2A2A',            // Dark border
  primary: '#FF6B35',           // Vibrant orange (same as light)
  primaryDark: '#FF8C42',       // Lighter orange for dark mode
  success: '#FF8C42',           // Orange success
  danger: '#FF6B6B',            // Lighter red for dark mode
  shadow: '#ffffff',            // Black shadow
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const colors = theme === "light" ? lightColors : darkColors;
  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);