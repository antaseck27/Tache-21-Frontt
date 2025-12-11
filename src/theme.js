// src/theme.js

export const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme !== null) return storedTheme === "true";
  }
  return false; // Clair par défaut
};

export const saveTheme = (darkMode) => {
  localStorage.setItem("darkMode", darkMode);
};
