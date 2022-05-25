import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import Catalog from './pages/Catalog/Catalog';
import EmptyCart from './pages/EmptyCart/EmptyCart';
import Start from './pages/Start/Start';

function App() {
  return (
    <div className="wrapper">
      <div className="container">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/empty_cart" element={<EmptyCart />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
