import React from 'react';
import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Landing from './pages/landing-screen/landing';
import SignedLand from './pages/signedLand/signedLand';
import AccountSettings from './pages/account-settings/acc-settings';
import BookingHistory from './pages/boking-history/booking-history';
import Favorites from './pages/favorites/favorites';
import PHPoint from './pages/ph-points/ph-points';
import ReviewComments from './pages/review-comments/review-comments';
import Logout from './pages/logout/logout';

interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    console.log('Loading user data...');
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('No user found, redirecting to login...');
    return <Navigate to="/" />;
  }

  return <Component />;
};



function App() {
  return (
    <div className={styles.main}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signedLand" element={<SignedLand />} />
            <Route path="/account-settings" element={<PrivateRoute component={AccountSettings} />} />
            <Route path="/booking-history" element={<PrivateRoute component={BookingHistory} />} />
            <Route path="/ph-point" element={<PrivateRoute component={PHPoint} />} />
            <Route path="/review-comments" element={<PrivateRoute component={ReviewComments} />} />
            <Route path="/favorites" element={<PrivateRoute component={Favorites} />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
