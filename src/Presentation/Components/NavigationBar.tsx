import React, {useState} from "react";
import { Link, Outlet } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from "../../Data/DataSource/firebase";

import './navigation-bar.css'

function NavigationBar() {
    const [user, setUser] = useState({});
    React.useEffect(() => {
        onAuthStateChanged(auth, (currentUser: any) => {setUser(currentUser);})  
      },[]);
      
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><Link to='/'>Dodo</Link></Navbar.Brand>
                    <Nav>
                        <Link to='/'>Home</Link>
                        { auth.currentUser === null ?
                        <>
                        <Link to='/login'>Login</Link>
                        <Link to='/registration'>Registration</Link>
                        </>
                        :
                        <>
                        <Link to='/edit-account'>Edit Account</Link>
                        <Link to='/view-account'>View Account</Link>
                        </>
                        }
                    </Nav>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}

export default NavigationBar;