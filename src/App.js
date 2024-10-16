import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ShoppingCartProvider } from "./utils/ShoopingCartContext";
import { AuthProvider } from "./utils/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <div className="App">
          <Header />
          <Outlet />
        </div>
      </ShoppingCartProvider>
    </AuthProvider>
  );
}

export default App;
