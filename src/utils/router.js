import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import MenPage from "../components/MenPage";
import WomenPage from "../components/WomenPage";
import KidsPage from "../components/KidsPage";
import Cart from "../components/Cart";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/men",
        element: <MenPage />,
      },
      {
        path: "/women",
        element: <WomenPage />,
      },
      {
        path: "/kids",
        element: <KidsPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

export default appRouter;
