import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import OrderCategory from "../Pages/Home/Home/Category/OrderCategory";
import Secret from "../Components/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import Users from "../Layout/Users";
import AdminRoute from "./AdminROute";
import SellerRoute from "./SellerRoute";
import ManageSellerProduct from "../Pages/Dashboard/Admin/ManageSellerProduct";
import ApprovedProducts from "../Pages/Dashboard/Seller/ApprovedProducts";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct";
import ManageProducts from "../Pages/Dashboard/Seller/ManageProducts";
import EditProduct from "../Pages/Dashboard/Seller/EditProduct";
import Payment from "../Pages/Dashboard/Customer/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/Customer/Payment/PaymentHistory";
import AllProducts from "../Pages/Shared/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <p>error</p>,
    children: [
      {
        path: "/",
        element: <Home></Home>
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
        path: '/allproducts',
        element: <AllProducts></AllProducts>
      },
      {
        path: '/orderCategory/:category',
        element: <OrderCategory></OrderCategory>
      },
      {
        path: '/secret',
        element: <PrivateRoute><Secret></Secret></PrivateRoute>
      },
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'mycart',
        element: <MyCart></MyCart>
      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },
      {
        path: 'paymenthistory',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: 'users',
        element: <AdminRoute><Users></Users></AdminRoute>
      },
      {
        path: 'managesellerproduct',
        element: <AdminRoute><ManageSellerProduct></ManageSellerProduct></AdminRoute>
      },
      {
        path: 'addproduct',
        element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
      },
      {
        path: 'managepreoducts',
        element: <SellerRoute><ManageProducts></ManageProducts></SellerRoute>
      },
      {
        path: 'editproduct/:id',
        element: <SellerRoute><EditProduct></EditProduct></SellerRoute>
      },
      {
        path: 'approvedproducts',
        element: <SellerRoute><ApprovedProducts></ApprovedProducts></SellerRoute>
      },
    ]
  }
]);

export default router