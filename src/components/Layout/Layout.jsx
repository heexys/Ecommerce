import Routers from "../../routers/Routers";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import AdminNav from "../../admin/AdminNav";
import { useLocation } from "react-router-dom";


const Layout = () => {

    const location = useLocation()

    return (
        <>

        {
            location.pathname.startsWith('/dashboard') ? <AdminNav /> : <Header />
        }
            <div className="ddd">
                <Routers />
            </div>
            <Footer />
        </>
    )
};

export default Layout;