import { Route, Routes } from 'react-router-dom';
import { Cart, Catalog, EmptyCart, Start } from './pages';

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
