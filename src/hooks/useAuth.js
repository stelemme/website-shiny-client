import { useState, useEffect } from "react";

// Firebase imports
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const useAuth = () => {
  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState(undefined)

  useEffect(() => onAuthStateChanged(auth, (user) => {
    if (user) {
      setLogin(true)
      setUsername(auth.currentUser.displayName)
    } else {
      setLogin(false)
      setUsername(undefined)
    }
  }), []
  );

  return { login, username }
}
