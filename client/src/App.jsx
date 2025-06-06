import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/about";
import { Contact } from "./pages/Contact";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Services } from "./pages/Services";
import {Navbar} from "./components/Navbar";
import { Footer } from "./components/Footer";
import {Error} from "./pages/Error";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./pages/Admin-User";
import { AdminContacts } from "./pages/Admin-Contact";
import { AdminUserUpdate } from "./pages/Admin-Update";
import { AdminContactUpdate } from "./pages/Admin-Con_update";

const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact/>} />          
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="*" element={<Error/>} />
                
          <Route path="/admin" element={<AdminLayout />} >
            <Route path="users" element={<AdminUsers/>} />
            <Route path="users/:id/edit" element={<AdminUserUpdate/>} />
            <Route path="contacts" element={<AdminContacts/>} />
            <Route path="contacts/:id/edit1" element={<AdminContactUpdate/>} />
          </Route>

        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
