import Home from "./pages/Home"
import Login from "./pages/Login"
import AdminPanel from "./pages/AdminPanel"
import Layout from "./components/Layout"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="admin/login" element={<Login />} />
            <Route path="admin/panel" element={<AdminPanel />} />
          </Route>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
