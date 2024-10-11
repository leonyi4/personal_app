import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Medicines from "./routes/Medicine/Medicines.jsx";
import Spendings from "./routes/Spendings/Spendings.jsx";
import Home from "./Components/Home.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"/",
        element:<Home/>
      },{
        path: "/medicine",
        element: <Medicines />,
      },
      {
        path: "/spendings",
        element: <Spendings />,
      },
    ],
    errorElement:<ErrorPage/>
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
