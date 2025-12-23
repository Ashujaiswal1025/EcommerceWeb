import { useState } from "react";
import { Route,Routes } from "react-router-dom";
import Header from "./components/Header"
// import banner from "./assets/banner1.jpeg"
import "./App.css";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp";
import Footer from "./components/Footer";
import Cart from "./Pages/Cart"
import ProductList from "./Pages/ProductList";
import { useLocation } from "react-router-dom";
import ProductDescription from "./Pages/ProductDescription";

function App() {
  const [count, setCount] = useState(0);
  const location  = useLocation();
  const hideFooter = ['/login','/signup'].includes(location.pathname)


  return (
    <>
      <div className=" min-h-screen">
        <Header />

        <main className="bg-slate-100 pt-20 pb-5">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/product/category/:categoryName" element={<ProductList /> }/>
          <Route path="/cart" element={<Cart />}/>
          <Route path='/product/:productName' element={<ProductDescription/>}/>
        </Routes>
        </main>
        {!hideFooter && <Footer/>}
      </div>
    </>
  );
}

export default App;
