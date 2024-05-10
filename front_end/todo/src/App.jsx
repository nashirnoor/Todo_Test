import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { PrivateRoute } from './Components/PrivateRoutes';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<PrivateRoute />} >
            <Route index element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
