import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPloicy from "./pages/RefundPloicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndContions from "./pages/TermAndContions";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import StripeContainer from './components/ScripeContainer'
import Orders from "./pages/Orders";
import PaymentStatus from './components/PaymentStatus'
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";
import Profile from './pages/Profile'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51OGEGLKScb87tq5muXfoTtEFSQVpJ3ol4uNmR7SHhJK34jZXtCTEAx14HobbiSFwwKYaxFZN40faCYUfbrx5BhzL00ap6FP7vI");

const options =localStorage.getItem("optionspayment")

function App() {
console.log('options',options)
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/paymentstatus" element={<Elements options={options} stripe={stripePromise}><PaymentStatus/></Elements>}/> 
          <Route path="/" element={<Layout />}/>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            {/* <Route path="stripepayment" element={<StripeContainer/>}/> */}
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="blog/:id" element={<SingleBlog />} />

            <Route path="my-orders" element={<PrivateRoutes><Orders/></PrivateRoutes>} />


            <Route path="cart" element={<PrivateRoutes><Cart/></PrivateRoutes>} />
            <Route path="checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>} />

            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="wishlist" element={<PrivateRoutes><Wishlist /></PrivateRoutes>} />
            <Route path="login" element={<OpenRoutes><Login /></OpenRoutes>} />
            <Route path="forgot-password" element={<Forgotpassword />} />

            <Route path="signup" element={<Signup />} />
            <Route path="reset-password/:token" element={<Resetpassword />} />

            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPloicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="term-conditions" element={<TermAndContions />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
