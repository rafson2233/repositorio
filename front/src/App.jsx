import "./App.css";
import { Route, Routes } from "react-router-dom";
import  Home  from "./pages/Home/Home";
import Header from './components/header/PageHeader';

function App() {
  return (
    <>
    <Routes>
      <Route path="/header" element={<Header/>}/> 
      <Route path="/" element={<Home/>}/> 
    </Routes>
    </>
  )
}

export default App;
