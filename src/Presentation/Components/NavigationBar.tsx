import { useContext } from 'react';
import { AuthContext } from '../../Common/AuthContext';
import { Link, Outlet } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import './navigation-bar.css';

function NavigationBar() {

    // const { user } = useContext(AuthContext);

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><Link to='/'>Dodo</Link></Navbar.Brand>
                    <Nav>
                        <Link to='/'>Home</Link>
                        
                        {/* TODO conditional render if user is logged in */}
                        <Link to='/create-flashcards'> <LibraryAddIcon className='card-add'/> Create </Link>
                        
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