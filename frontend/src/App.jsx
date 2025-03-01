import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ServicesPage from "./pages/ServicesPage";
import FooterComponent from "./components/FooterComponent";
import PrivateRoutesUser from "./components/PrivateRoutesUser";
import PrivateRoutesAdmin from "./components/PrivateRoutesAdmin";
import Dashboard from "./pages/Dashboard";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore.js";
import Spinner from "./components/Spinner";
import { useState, useEffect } from "react";
import CreatePostPage from "./pages/CreatePostPage.jsx";
import BlogPosts from "./pages/BlogPosts.jsx";
import PostPage from "./components/PostPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// protected routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    // toast.error("You need to log in to access this page");
    return <Navigate to="/login" replace />;
  }

  if (!user.isActive) {
    toast.error("Your account is not active, contact Admin!");
    // return <Navigate to="/verify-handler" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isActive) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <Spinner />;

  return (
    <div>
      <ScrollToTop />
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog-posts" element={<BlogPosts />} />
        <Route path="/posts/:slug" element={<PostPage />} />

        {/* these routes will be redirected once authenticated */}
        <Route
          path="/sign-up"
          element={
            <RedirectAuthenticatedUser>
              <SignUp />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />

        {/* private user routes */}
        <Route element={<PrivateRoutesUser />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* private admin routes */}
        <Route element={<PrivateRoutesAdmin />}>
          <Route path="/create-post" element={<CreatePostPage />} />
        </Route>

        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
