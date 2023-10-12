import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    <Toaster/>
    </BrowserRouter>
  )
}

export default App;
