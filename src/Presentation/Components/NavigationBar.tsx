import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from "../../Data/DataSource/firebase";
import { useNavigate } from 'react-router-dom';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import StyleIcon from '@mui/icons-material/Style';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import './navigation-bar.css';


// Logout button
function LogoutButton () {
    const navigate = useNavigate();
    const logoutFunction = async () => {await signOut(auth); navigate('/login');}
    return (
        <button onClick={logoutFunction}> Logout </button>
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
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><Link to='/'>Dodo</Link></Navbar.Brand>
                    <Nav>
                        <Link to='/'> <HomeIcon /> Home</Link>

                        { auth.currentUser === null ?
                            <>
                                <Link to='/login'>Login</Link>
                                <Link to='/registration'>Registration</Link>
                            </> :
                            <>
                                <Link to='/create-flashcards'> <LibraryAddIcon className='card-add'/> Create </Link>
                                <Link to='/view-flashcards'> <StyleIcon /> Cards</Link>
                                <Link to='/edit-account'> <ManageAccountsIcon /> Edit Account</Link>
                                <Link to='/view-account'> <AccountCircleIcon /> View Account</Link>
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