import React from 'react';
import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing-screen/landing';
import SignedLand from './pages/signedLand/signedLand';


function App() {
  return (
    <div className={styles["main"]}>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Landing/>}/>
            
            <Route path='signedLand' element={<SignedLand/>}/>
          </Routes>
        </Router>
      
      </div>
    
    </div>
  );
}

export default App;

