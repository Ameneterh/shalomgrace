import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function PrivateRoutesAdmin() {
  const { user } = useAuthStore();

  return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" />;
}
