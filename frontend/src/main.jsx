import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { store, persistor } from "./redux/store.js";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import ThemeProvider from "./components/ThemeProvider.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // <PersistGate persistor={persistor}>
  //   <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  //   </Provider>
  // </PersistGate>
);
