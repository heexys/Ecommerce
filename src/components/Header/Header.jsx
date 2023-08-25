import {useRef, useEffect} from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { scrollToTop } from '../Scroll-Link/ScrollToTop';

//firebase
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';

// Img //
import logo from "../../assets/images/eco-logo.png"
import userIcon from "../../assets/images/user-icon.png"

// Icons //
import { FiMenu } from 'react-icons/fi'

import './header.css'
import { motion } from 'framer-motion';
import { Container, Row } from 'reactstrap';
import { toast } from 'react-toastify';

const nav__links = [
    {
        path:'home',
        display: 'Home'
    },
    {
        path:'shop',
        display: 'Shop'
    },
    {
        path:'cart',
        display: 'Cart'
    },
]

const Header = () => {

    const headerRef = useRef(null);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalFavorite = useSelector(state => state.cart.totalQuantity);
    const profileActionRef = useRef(null);

    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const multimartHandle = () => {
        navigate('/');
      }

    const stickyHeaderFunc = () => {
        window.addEventListener("scroll",  () => {
            if (
                document.body.scrollTop > 55 ||
                document.documentElement.scrollTop > 55
            ) {
                headerRef.current.classList.add("sticky__header")
            } else {
                headerRef.current.classList.remove("sticky__header")
            }
        });
    };

    const logout = () => {
      signOut(auth).then(()=>{
        toast.success('Logged out')
      }).catch(err => {
          toast.error(err.message)
      })
    }

    useEffect(() => {
        stickyHeaderFunc();

        return () => window.removeEventListener("scroll",  stickyHeaderFunc);
    });

    const menuToggle = () => menuRef.current.classList.toggle('active__menu')

    const navigateToCart = () => {
        navigate('/cart');
        scrollToTop();
    };

    const navigateToFavorite = () => {
        navigate('/favorite');
        scrollToTop();
    };

    const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions');

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="nav__wrapper">
                        <motion.div whileTap={{scale:0.93}} onClick={multimartHandle} className="logo">
                            <img src={logo} alt="logo" />
                            <div>
                                <h1>Multimart</h1>
                            </div>
                        </motion.div>

                        <div className="navigation" ref={menuRef} onClick={menuToggle}>
                            <ul className="menu">
                                {nav__links.map((item, index) => (
                                    <li className='nav__item' key={index}>
                                        <NavLink onClick={scrollToTop}
                                            to={item.path}
                                            className={(navClass) =>
                                                navClass.isActive ?  'nav__active' : ''
                                            }
                                        >
                                            {item.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="nav__icons">
                            <span className='fav__icon' onClick={navigateToFavorite}>
                                <i class="ri-heart-line"></i>
                                <span className="badge">{ totalFavorite}</span>
                            </span>

                            <span className="cart__icon" onClick={navigateToCart}>
                                <i class="ri-shopping-bag-line"></i>
                                <span className="badge">{ totalQuantity}</span>
                            </span>

                            <div className='profile'>
                                <motion.img
                                  whileTap={{scale:1.2}} 
                                  src={ currentUser ? currentUser.photoURL : userIcon}
                                  alt=''
                                  onClick={toggleProfileActions}
                                />

                                  <div
                                   className="profile__actions show__profileActions"
                                   ref={profileActionRef}
                                   onClick={toggleProfileActions}
                                  >
                                    {currentUser ?
                                      <div>
                                        <span onClick={logout}>Logout</span>
                                      </div> : <div className='d-flex align-items-center jistify-content-center flex-column'>
                                        <Link to="/signup">Signup</Link>
                                        <Link to="/login">Login</Link>
                                      </div>
                                    }
                                  </div>

                            </div>
                        <div className="mobile__menu">
                            <span onClick={menuToggle}>
                                <FiMenu />
                            </span>
                        </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    )
};

export default Header;