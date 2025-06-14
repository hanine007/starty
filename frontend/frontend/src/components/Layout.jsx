import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
const Layout = () => {
    return(
        <>
        <Header/>
        <main style={{ padding: '1rem', minHeight: '80vh' }}>
            <Outlet />
        </main>
        <Footer/>
        
        
        </>
    )

}
export default Layout;