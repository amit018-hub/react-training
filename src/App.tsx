import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './scss/App.scss';
import LoginPage from './pages/Login/LoginPage';
import { Suspense } from 'react';
import LoadingSpinner from './components/UI/LoadingSpinner';
import NotFound from './pages/NotFound/NotFound';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import CustomerPage from './pages/Customer/CustomerPage';
import SaveCustomerPage from './pages/Customer/SaveCustomerPage';
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<MainLayout />}>
              <Route path="*" element={<NotFound />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/customers" element={<CustomerPage />} />
              <Route path="/customers/save" element={<SaveCustomerPage />} />
              <Route path="/customers/edit/:id" element={<SaveCustomerPage />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
