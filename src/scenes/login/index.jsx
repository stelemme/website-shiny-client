import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mui
import { Box, TextField, Button, Typography } from "@mui/material";

// Firebase
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";

// Hooks
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { username, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("logged in");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ConditionalRender = () => {
    if (login) {
      return (
        <div>
          <Typography gutterBottom>You are logged in as:</Typography>
          <Typography variant="h4">{username}</Typography>
          <Button
            type="submit"
            variant="contained"
            color="neutral"
            fullWidth
            sx={{ mt: 2, mb: 4 }}
            style={{ color: "white" }}
            onClick={() => signOut(auth)}
          >
            Log Out
          </Button>
          <Typography>Login with a different account:</Typography>
        </div>
      );
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box m="20px" maxWidth="300px">
        <ConditionalRender />
        <form onSubmit={handleSubmit}>
          <TextField
            color="secondary"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
            autoComplete="email"
          />
          <TextField
            color="secondary"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            variant="contained"
            color="neutral"
            fullWidth
            sx={{ my: 2 }}
            style={{ color: "white" }}
          >
            Log In
          </Button>
        </form>
      </Box>
    </Box>
  );
}
