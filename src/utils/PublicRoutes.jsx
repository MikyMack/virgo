
import { Navigate, Outlet } from 'react-router-dom'

function PublicRoutes() {
    const isAuthenticated = localStorage.getItem('userAccessToken') ? true : false;
  
  return (
    !isAuthenticated  ? <Outlet/> : <Navigate to='/'/>
  )
}

export default PublicRoutes 