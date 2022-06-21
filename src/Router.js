import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import List from './pages/List/List';
import Detail from './pages/Detail/Detail';
import Cart from './pages/Cart/Cart';
import Nav from './pages/components/Nav/Nav';
import Footer from './pages/components/Footer/Footer';
import Test from './pages/Login/Test';
import { UserContext } from './context/UserContext';

function Router() {
  const [navUpdate, setNavUpdate] = useState(false);
  const [cartUpdate, setCartUpdate] = useState(false);

  return (
    <UserContext.Provider
      value={{ navUpdate, setNavUpdate, cartUpdate, setCartUpdate }}
    >
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list" element={<List />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/test" element={<Test />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default Router;
