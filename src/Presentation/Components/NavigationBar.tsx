import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import './navigation-bar.css';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../Data/DataSource/firebase';

function NavigationBar() {
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [])

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><Link to='/'>Dodo</Link></Navbar.Brand>
                    <Nav>
                        <Link to='/'>Home</Link>

                        { user &&
                            <Link to='/create-flashcards'> <LibraryAddIcon className='card-add'/> Create </Link>
                        }
                        
                        
                        <Link to='/login'>Login</Link>
                        <Link to='/registration'>Registration</Link>
                        <Link to='/edit-account'>Edit Account</Link>
                        <Link to='/view-account'>View Account</Link>

                    </Nav>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}

export default NavigationBar;