import { useState } from 'react';
import './App.css';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './components/ui/Wellcomepage';
import Animated from './Pages/Animated';
import Home from './Pages/Home';
import Header from './components/common/Header';
import Buy from './Pages/Buy';
import Sucessfull from './Pages/Sucessfull';
function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  return (
  <>
        <BrowserRouter>
        <AnimatePresence mode="wait">
          {showWelcome && (
            <WelcomeScreen
              onLoadingComplete={() => setShowWelcome(false)}
            />
          )}
        </AnimatePresence>
        {!showWelcome && (
          <>
          <Animated/>
            <Header/>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/buy' element={<Buy/>} />
              <Route path='/sucessfull' element={<Sucessfull/>} />
            </Routes>
         
          </>
        )}
      </BrowserRouter>
  
  </>
  );
}

export default App;
