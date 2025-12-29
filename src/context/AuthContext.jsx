
// // src/context/AuthContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// const API_URL = "http://localhost:5000/api";

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loadingUser, setLoadingUser] = useState(true);

//   const fetchUser = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoadingUser(false);
//       return;
//     }

//     try {
//       const res = await axios.get(`${API_URL}/settings/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//     } catch {
//       localStorage.removeItem("token");
//       setUser(null);
//     } finally {
//       setLoadingUser(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, fetchUser, loadingUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const API = import.meta.env.VITE_API_URL;




export const AuthProvider = ({ children }) => {
  // Initialisation depuis localStorage
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoadingUser(false);
      return;
    }

    try {
      const res = await axios.get(`${API}/api/settings/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.error("Auth error:", err.message);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  //  Charger user au démarrage

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, fetchUser, loadingUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
