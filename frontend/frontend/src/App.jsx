import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LoginAdmin from './pages/Login';
import RegisterAdmin from './pages/registerAdmin';
import RegisterUser from './pages/registerUser';
import LoginUser from './pages/loginUser';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginUser />} />
          <Route path="register" element={<RegisterUser />} />
          <Route path="admin/login" element={<LoginAdmin />} />
          <Route path="admin/register" element={<RegisterAdmin />} />
          <Route path="admin/panel" element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
