import { Routes , Route} from "react-router-dom"

import Navbar from "../src/components/Navbar.jsx"
import Footer from "../src/components/Footer.jsx"
import Events from "./pages/Events.jsx"
import Home from "./pages/Home.jsx"
import EventDetails from "./pages/EventDetails.jsx"
import CreateEvent from "./pages/CreateEvent.jsx"




function App() {


  return (
    <>
    <Navbar />
    <Routes>
    
      
      <Route path="/" element={<Home/>} />
      <Route path="/events" element={<Events/>} />
      <Route path="/event/:eventId" element={<EventDetails/>} />
      <Route path="/create/event" element={<CreateEvent/>} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
