import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TeeShirts from "./pages/TeeShirts";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import CartStore from "./context/cart/Cart.store";
import './App.css';

function App() {
  return (
    <CartStore>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<TeeShirts></TeeShirts>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
        </Routes>
      </Router>
    </CartStore>
  );
}

export default App;
