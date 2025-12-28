// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loadingUser } = useAuth();

  // Pendant le chargement de l'utilisateur
  if (loadingUser) return null; // ou un spinner

  // Si pas connecté → login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si connecté → page autorisée
  return children;
}
