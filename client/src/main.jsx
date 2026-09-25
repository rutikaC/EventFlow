import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter} from "react-router-dom"
import { store } from './app/store.js'
import { Provider } from "react-redux"
import { ThemeProvider } from './context/ThemeContext.jsx'
import { Toaster} from "react-hot-toast"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store = {store}>
    <ThemeProvider>
    <App />
    <Toaster/>
    </ThemeProvider>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
