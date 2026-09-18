import { Routes , Route} from "react-router-dom"

import Navbar from "../src/components/Navbar.jsx"
import Footer from "../src/components/Footer.jsx"
import Register from "./pages/Register.jsx"
import Events from "./pages/Events.jsx"


function App() {


  return (
    <>
    <Navbar />
    <Routes>
    
      <Route path="/events" element={<Events/>} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
