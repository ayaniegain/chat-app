import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Chat from "./pages/Chat"
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Chat/>}/>
    </Routes>
    <Toaster/>
    </BrowserRouter>
  )
}

export default App;
