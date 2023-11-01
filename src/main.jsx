import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
// import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<App/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          {/* <Route path="/contact" element={<App/>} /> */}
        </Routes>
    </Router>
  </ChakraProvider>,
)
