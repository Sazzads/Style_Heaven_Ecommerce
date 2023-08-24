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
import AllPaymentHistory from "../Pages/Dashboard/Admin/AllPaymentHistory";
import Tops from "../Pages/Pages/Tops";
import Bottoms from "../Pages/Pages/Bottoms";
import Kids from "../Pages/Pages/Kids";
import Accessories from "../Pages/Pages/Accessories";
import ManageOrder from "../Pages/Dashboard/Admin/ManageOrder";
import OrderedProducts from "../Pages/Dashboard/Seller/OrderedProducts";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome/AdminHome";
import CustomerDashboard from "../Pages/Dashboard/Customer/CustomerDashboard/CustomerDashboard";
import SellerHome from "../Pages/Dashboard/Seller/SellerHome/SellerHome";
import New from "../Pages/Pages/New";
import Collections from "../Pages/Pages/Collections";

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
        path: '/new',
        element: <New></New>
      },
      {
        path: '/tops',
        element: <Tops></Tops>
      },
      {
        path: '/bottoms',
        element: <Bottoms></Bottoms>
      },
      {
        path:'/accessories',
        element:<Accessories></Accessories>
      },
      {
        path:'/collections',
        element:<Collections></Collections>
      },
      {
        path: '/kids',
        element: <Kids></Kids>
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
        path: 'customerhome',
        element: <CustomerDashboard></CustomerDashboard>
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
        path: 'home',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
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
        path: 'allPaymentshistory',
        element: <AdminRoute><AllPaymentHistory></AllPaymentHistory></AdminRoute>
      },
      {
        path: 'manageorder',
        element: <AdminRoute><ManageOrder></ManageOrder></AdminRoute>
      },
      {
        path: 'sellerhome',
        element: <SellerRoute><SellerHome></SellerHome></SellerRoute>
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
      {
        path: 'orderedproducts',
        element: <SellerRoute><OrderedProducts></OrderedProducts></SellerRoute>
      },
    ]
  }
]);

export default router