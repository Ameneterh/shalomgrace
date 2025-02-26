import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/server"
    : "/server";

axios.defaults.withCredentials = true;

export const useInvoiceStore = create((set) => ({
  //   invoice: null,
  error: null,
  isLoading: false,
  message: null,

  //   add new invoice
  createInvoice: async (
    validity,
    invoiceNumber,
    list,
    total,
    invoiceType,
    createdBy,
    client
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/invoice/create-invoice`, {
        validity,
        invoiceNumber,
        list,
        total,
        invoiceType,
        createdBy,
        client,
      });
      set({
        // invoice: response.data.invoice,
        // isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error adding invoice",
        isLoading: false,
      });
      throw error;
    }
  },

  //   get all clients
  getAllInvoices: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/invoice/get-invoices`);
      set({
        invoices: response.data.invoices,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting Invoices",
        isLoading: false,
      });
      throw error;
    }
  },

  //   get one clients
  getOneInvoice: async (clientId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/client/get-client/${clientId}`
      );
      set({
        client: response.data.client,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting clients",
        isLoading: false,
      });
      throw error;
    }
  },
}));
