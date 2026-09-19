import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { RentixProvider } from './context/RentixContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { BottomNav } from './components/common/BottomNav';
import { QRHandoverModal } from './components/modals/QRHandoverModal';
import { LocationModal } from './components/modals/LocationModal';
import { AuthModal } from './components/modals/AuthModal';

import { HomePage } from './pages/HomePage';
import { FeedPage } from './pages/FeedPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ListItemPage } from './pages/ListItemPage';
import { MessagesPage } from './pages/MessagesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <RentixProvider>
        <ScrollToTop />
        <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
          <Navbar />
          
          <main className="flex-1 w-full overflow-x-hidden">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/list-item" element={<ListItemPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/messages/:chatId" element={<MessagesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          <Footer />
          <BottomNav />

          {/* Global Interactive Modals */}
          <QRHandoverModal />
          <LocationModal />
          <AuthModal />
        </div>
      </RentixProvider>
    </BrowserRouter>
  );
}

export default App;
