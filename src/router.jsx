import { createBrowserRouter } from "react-router-dom";

// import {ProtectedRoute} from "@components/ProtectedRoute"

import Home from "@pages/Home.jsx";
import Login from "@pages/Login";
import SignUp from "@pages/SignUp";

// 📄 Import newly created pages
import PrivacyPolicy from "@pages/Legal/PrivacyPolicy";
import TermsAndConditions from "@pages/Legal/TermsAndConditions";
import CancellationAndRefund from "@pages/Legal/CancellationAndRefund";
import ShippingAndDelivery from "@pages/Legal/ShippingAndDelivery";
import ContactUs from "@pages/Legal/ContactUs";

//  all the components that are used in the layout
import { AdminLayout, OwnerLayout, GuestLayout } from "@layouts";

//  all the components that are used in the owner dashboard
import {
  AddTurf,
  OwnerDashboard,
  TurfManagement,
  OwnerReviews,
  OwnerBookings,
} from "@components/owner";

//  all the components that are used in the admin dashboard
import {
  UserManagement,
  NewOwnerRequests,
  RejectedOwnerRequests,
  AdminDashboard,
  OwnerViewer,
  TurfList,
  AllTurf,
  TransactionSection,
} from "@components/admin";
import ProtectedRoute from "@components/ProtectedRoute/ProtectedRoute";

// 404 page

import { NotFound } from "@components/common";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      // 👇 Additional pages
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-and-conditions", element: <TermsAndConditions /> },
      { path: "cancellation-and-refund", element: <CancellationAndRefund /> },
      { path: "shipping-and-delivery", element: <ShippingAndDelivery /> },
      { path: "contact-us", element: <ContactUs /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      {
        path: "owner-requests",
        children: [
          { path: "new", element: <NewOwnerRequests /> },
          { path: "rejected", element: <RejectedOwnerRequests /> },
        ],
      },
      { path: "users", element: <UserManagement /> },
      {
        path: "owners",
        children: [
          { path: "", element: <OwnerViewer /> },
          { path: ":ownerId/turf", element: <TurfList /> },
        ],
      },

      { path: "turfs", element: <AllTurf /> },
      { path: "transactions", element: <TransactionSection /> },
    ],
  },
  {
    path: "/owner",
    element: (
      <ProtectedRoute requiredRole="owner">
        <OwnerLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <OwnerDashboard /> },
      { path: "add-turf", element: <AddTurf /> },
      { path: "turfs", element: <TurfManagement /> },
      { path: "reviews", element: <OwnerReviews /> },
      { path: "bookings", element: <OwnerBookings /> },
    ],
  },
]);

export default router;
