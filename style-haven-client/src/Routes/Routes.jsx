import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import OrderCategory from "../Pages/Home/Home/Category/OrderCategory";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<p>error</p>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
      },
      {
          path: '/register',
          element: <Register></Register>
      },
      {
          path: '/orderCategory/:category',
          element: <OrderCategory></OrderCategory>
      },
      ]
    },
  ]);

  export default router