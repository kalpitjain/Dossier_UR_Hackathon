import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dossier from "./pages/Dossier";
import DossierFinance from "./pages/DossierFinance";
import DossierAccount from "./pages/DossierAccount";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => {
  const authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleAuthenticated(authClient);
        window.location.reload();
      },
    });
  }
};

async function handleAuthenticated(authClient) {
  const identity = await authClient.getIdentity();
  const userPrincipal = identity._principal.toString();
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Dossier loggedInPrincipal={userPrincipal} />}
        />
        <Route
          path="/DossierFinance"
          element={<DossierFinance loggedInPrincipal={userPrincipal} />}
        />
        <Route
          path="/DossierAccount"
          element={<DossierAccount loggedInPrincipal={userPrincipal} />}
        />
      </Routes>
    </Router>
  );
}
init();
