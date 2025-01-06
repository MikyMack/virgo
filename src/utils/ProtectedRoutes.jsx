import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
  const isAuthenticated = localStorage.getItem('userAccessToken') ? true : false;

  return (
    isAuthenticated ? <Outlet /> : <Navigate to='/admin/AdminSignin/' />
  );
}

export default ProtectedRoutes;
