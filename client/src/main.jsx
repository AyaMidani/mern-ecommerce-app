import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"   // ← important
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store  from "./store/store"
import { Toaster } from "./components/ui/toaster"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Provider store={store}>
   <App />
  <Toaster />
  </Provider>
  </BrowserRouter>
)
