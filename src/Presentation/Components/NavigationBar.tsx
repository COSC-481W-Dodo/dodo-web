
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from "../../Data/DataSource/firebase";
import { useNavigate } from 'react-router-dom';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import './navigation-bar.css';
import { NavDropdown } from 'react-bootstrap';
import logo from '../../../src/dodo.png';

// Logout button
function LogoutButton () {
    const navigate = useNavigate();
    const logoutFunction = async () => {await signOut(auth); navigate('/login');}
    return (
        <Link to='' onClick={logoutFunction} className='nav-link'><LogoutIcon className='icon-color'/> Logout</Link>
    )
};

function NavigationBar() {

    const [user, setUser] = useState<User | null>();

    // Allows us to check if the user is logged in on refresh   
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) =>  {
            setUser(currentUser);
        }); 
    }, []);

    return (
        <>
            <Navbar className='nav-background'>
                <Container>
                    <Navbar.Brand><Link to='/' className='navbar-brand'><img src={logo} width="45" height="45" alt="Logo image of a smiling dodo bird." /> Dodo</Link></Navbar.Brand>
                    <Nav>
                        { auth.currentUser === null ?
                            <>
                                <Link to='/login' className='nav-link'><LoginIcon className='icon-color'/> Login</Link>
                                <Link to='/registration' className='nav-link'><CreateIcon className='icon-color'/> Registration</Link>
                            </> :
                            <>
                                <Link to='/create-flashcards' className='nav-link'><LibraryAddIcon className='icon-color'/> Create</Link>
                                <NavDropdown title="Account" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/view-account">View Account</NavDropdown.Item>
                                    <NavDropdown.Item href="/edit-account">Edit Account</NavDropdown.Item>
                                </NavDropdown>
                                <LogoutButton />
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