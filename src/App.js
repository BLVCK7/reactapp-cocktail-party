import { Route, Routes } from 'react-router-dom';
import Catalog from './pages/Catalog/Catalog';
import Start from './pages/Start/Start';

function App() {
  return (
    <div className="wrapper">
      <div className="container">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
