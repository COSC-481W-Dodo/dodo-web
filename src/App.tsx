import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavigationBar from './Presentation/Components/NavigationBar';
import Home from './Presentation/Views/Home/Home';
import Login from './Presentation/Views/Login/Login';
import Registration from './Presentation/Views/Registration/Registration';
import EditAccount from './Presentation/Views/EditAccount/EditAccount';
import ViewAccount from './Presentation/Views/ViewAccount/ViewAccount';
import CreateFlashcards from './Presentation/Views/CreateFlashcards/CreateFlashcards';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/' element={ <NavigationBar /> }>
          <Route index element = { <Home /> } />
          <Route path ='/login' element = { <Login /> } />
          <Route path = '/registration' element = { <Registration /> } />
          <Route path = '/edit-account' element = { <EditAccount /> } />
          <Route path = '/view-account' element = { <ViewAccount /> } />
          <Route path='/create-flashcards' element={<CreateFlashcards />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
