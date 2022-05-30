import './App.css';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './components/views/auth/Login/Login';
import Register from './components/views/auth/Register/Register';
import Donate from './components/views/Donate/Donate';
import Tasks from './components/views/Tasks/Tasks';
import Registered from './components/views/Registered/Registered';

// Lazy loading import
const Error404 = lazy(() => import('./components/views/Error404/Error404'));

// Declare authentiation component for private routes
const RequireAuth = ({ children }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true}/>
  }
  return children;
};

// Declare parameters for page transition animations
const pageTransition = {
  in: {
    opacity: 1
  },
  out: {
    opacity: 0,
  },
}

export default function App() {
  const location = useLocation()
  // Routes wraps all routes
  // AnimatePresence wraps all routes, each wrapped in motion.div
  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route
            path='/' 
            element={
              <RequireAuth>
                <motion.div className='page' initial='out' animate='in' exit='out' variants={pageTransition}>
                  <Tasks/>
                </motion.div>
              </RequireAuth>
            } />
          <Route 
            path='/login' 
            element={
              <motion.div className='page' initial='out' animate='in' exit='out' variants={pageTransition}>
                <Login/>
              </motion.div>
            } />
          <Route 
            path='/register' 
            element={
              <motion.div className='page' initial='out' animate='in' exit='out' variants={pageTransition}>
                <Register/>
              </motion.div>
            } />
          <Route 
            path='/registered/:teamID' 
            element={
              <motion.div className='page' initial='out' animate='in' exit='out' variants={pageTransition}>
                <Registered/>
              </motion.div>
            } />
          <Route 
            path='*' 
            element={
              <motion.div className='page' initial='out' animate='in' exit='out' variants={pageTransition}>
                {/* Suspense renders a loading component while lazy loading loads the main component */}
                <Suspense fallback={<>...</>}>
                  <Error404/>
                </Suspense>
              </motion.div>
            } />
          <Route
            path="/donate"
            element={
              <RequireAuth>
                <motion.div
                  className='page'
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                >
                  <Donate/>
                </motion.div>
              </RequireAuth>
            }/>
        </Routes>
      </AnimatePresence>
    </>
  );
}
