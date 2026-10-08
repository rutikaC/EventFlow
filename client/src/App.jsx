import { Routes , Route} from "react-router-dom"

import Navbar from "../src/components/Navbar.jsx"
import Footer from "../src/components/Footer.jsx"
import Events from "./pages/Events.jsx"
import Home from "./pages/Home.jsx"
import EventDetails from "./pages/EventDetails.jsx"
import CreateEvent from "./pages/CreateEvent.jsx"
import Booking from "./pages/Booking.jsx"





function App() {


  return (
    <>
    <Navbar />
    <Routes>
    
      
      <Route path="/" element={<Home/>} />
      <Route path="/events" element={<Events/>} />
      <Route path="/event/:eventId" element={<EventDetails/>} />
      <Route path="/create/event" element={<CreateEvent/>} />
      <Route path="/booking/:eventId" element={<Booking/>} />
      
    </Routes>
    <Footer/>
    </>
  )
}

export default App
