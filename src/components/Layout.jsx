import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

const Layout = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Header />
      <main 
        className="flex-grow container mx-auto px-4 py-8"
        style={{ 
          backgroundColor: 'var(--color-bg-primary)',
          color: 'var(--color-text-primary)'
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
