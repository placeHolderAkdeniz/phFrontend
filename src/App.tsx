import React from 'react';
import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Landing from './pages/landing-screen/landing';
import AccountSettings from './pages/account-settings/acc-settings';
import BookingHistory from './pages/boking-history/booking-history';
import Favorites from './pages/favorites/favorites';
import PHPoint from './pages/ph-points/ph-points';
import ReviewComments from './pages/review-comments/review-comments';
import Logout from './pages/logout/logout';
import HotelPage from './pages/hotel-page/hotel-page';
import Filtration from './pages/filtration/filtration';
import AdminPanel from './pages/admin-panel/admin-panel';
import NewRoom from './pages/admin-panel/new-room/new-room';
import NewHotel from './pages/admin-panel/new-hotel/new-hotel';

interface PrivateRouteProps {
  component: React.ComponentType;
  adminOnly?: boolean;
}

const PrivateRoute = ({ component: Component, adminOnly = false }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    console.log('Loading user data...');
    return <div>Loading...</div>;
  }

  if (!user || (adminOnly && !user.isAdmin)) {
    console.log('No user found or not authorized, redirecting to login...');
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
            <Route path="/signedLand" element={<PrivateRoute component={Landing} />} />
            <Route path="/account-settings" element={<PrivateRoute component={AccountSettings} />} />
            <Route path="/booking-history" element={<PrivateRoute component={BookingHistory} />} />
            <Route path="/ph-point" element={<PrivateRoute component={PHPoint} />} />
            <Route path="/review-comments" element={<PrivateRoute component={ReviewComments} />} />
            <Route path="/favorites" element={<PrivateRoute component={Favorites} />} />
            <Route path="/hotel/:_id" element={<HotelPage />} />
            <Route path="/filtration" element={<Filtration />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin-panel" element={<PrivateRoute component={AdminPanel} adminOnly />} />
            <Route path="/new-rooms" element={<PrivateRoute component={NewRoom} adminOnly />} />
            <Route path="/new-hotels" element={<PrivateRoute component={NewHotel} adminOnly />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
