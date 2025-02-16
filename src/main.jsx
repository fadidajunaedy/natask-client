import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { persistor, store } from "./store/index.js"
import { PersistGate } from "redux-persist/integration/react"

import App from "./App.jsx"

import 'aos/dist/aos.css';
import "./style.css"

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)