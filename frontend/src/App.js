import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Login from './components/Login';
import UserRegister from './components/UserRegister';
import Perfil from './components/Perfil';
import TopProductos from './components/TopProductos'; 
import './App.css';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideNavbarOnRoutes = ['/login', '/register'];
  const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);

  return (
    <div className="App">
      {!shouldHideNavbar && <Navbar />}
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vender" element={<Vender />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      <TopProductos /> {/*  Carrusel o Top 5 productos */}

      {/* Mensaje motivacional debajo del carrusel */}
      <div className="dashboard-banner">
        <h1 className="dashboard-title">🌟 Los mejores productos al alcance de tu mano</h1>
        <p className="dashboard-subtitle">🧺 De producción directa al consumidor final</p>
      </div>

      <ProductList /> {/* Lista general de productos */}
    </div>
  );
}

function Vender() {
  return (
    <div className="vender-container">
      <section className="product-form-section">
        <ProductForm />
      </section>

      <section className="user-products-section">
        <h2>🛒 Mis Productos Publicados</h2>
        <ProductList showOnlyUserProducts={true} />
      </section>

      <section className="other-products-section">
        <h2>📦 Productos de Otros Usuarios</h2>
        <ProductList showOnlyUserProducts={false} excludeUserProducts={true} />
      </section>
    </div>
  );
}

export default App;
