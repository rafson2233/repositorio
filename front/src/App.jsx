import "./App.css";
import { Route, Routes } from "react-router-dom";
import  Home  from "./pages/Home/Home";
import Header from './components/header/PageHeader';
import About from "./pages/About/About";

function App() {
  return (
    <>
    <Routes>
      <Route path="/header" element={<Header/>}/> 
      <Route path="/" element={<Home/>}/> 
      <Route path="/about" element ={<About/>}/>
    </Routes>
    </>
  )
}

export default App;
