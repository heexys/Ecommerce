import { Container, Row, Col } from "reactstrap";
import '../styles/admin-nav.css';
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import useAuth from "../custom-hooks/useAuth";
import { auth } from '../firebase.config';
import { signOut } from 'firebase/auth';

import {useRef, useEffect} from 'react';
import { NavLink, useNavigate, useLocation  } from "react-router-dom";


const admin__nav = [
    {
        display:'Dashboard',
        path: '/dashboard'
    },

    {
        display:'Products',
        path: '/dashboard/all-products'
    },

    {
        display:'Orders',
        path: '/dashboard/orders'
    },

    {
        display:'Users',
        path: '/dashboard/users'
    },
]

const AdminNav = () => {
    const location = useLocation();

    const { currentUser } = useAuth()
    const navigate = useNavigate();

    const multimartHandle = () => {
      navigate('/');
    }
    const profileActionRef = useRef(null);

    const logout = () => {
      signOut(auth).then(()=>{
        navigate('/login')
        toast.success('Logged out')
      }).catch(err => {
          toast.error(err.message)
      })
    }

  const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions');

  return (
  <>
    <header className="admin__header">
        <div className="admin__nav-top">
            <Container>
                <div className="admin__nav-wrapper-top">
                    <motion.div whileTap={{scale:0.93}} className="logo" onClick={multimartHandle}>
                        <h2 >Multimart</h2>
                    </motion.div>

                    <div className="search__box">
                        <input type="text" placeholder="Search...." />
                    </div>
                    
                    <div className="admin__nav-top-right">
                        <span><i class="ri-notification-3-line"></i></span>
                        <span><i class="ri-settings-2-line"></i></span>
                        <div className='profile'>
                                <motion.img
                                  whileTap={{scale:1.2}} 
                                  src={ currentUser && currentUser.photoURL}
                                  alt=''
                                  onClick={toggleProfileActions}
                                />

                                  <div
                                   className="show__profileActions"
                                   id="logout_admin"
                                   ref={profileActionRef}
                                   onClick={logout}
                                  >
                              <div>
                                <span>Logout</span>
                              </div>
                           </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    </header>

    <section className="admin__menu p-0">
      <Container>
        <Row>
          <div className="admin__navigation">       
            <ul className="admin__menu-list">
              {admin__nav.map((item, index) => (
                <li className="admin__menu-item" key={index}>
                  <NavLink
                    to={item.path}
                    className={location.pathname === item.path || (location.pathname === '/dashboard' && item.path === '/dashboard') ? 'active__admin-menu' : ''}
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </Row>
      </Container>
    </section>
  </>
  );
}

export default AdminNav