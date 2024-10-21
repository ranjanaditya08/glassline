import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ShoppingCartProvider } from "./utils/ShoopingCartContext";
import { AuthProvider } from "./utils/AuthContext";
import { AdminCartProvider } from "./utils/AdminContext";

function App() {
  return (
    <AuthProvider>
      <AdminCartProvider>
        <ShoppingCartProvider>
          <div className="App">
            <Header />
            <Outlet />
          </div>
        </ShoppingCartProvider>
      </AdminCartProvider>
    </AuthProvider>
  );
}

export default App;
