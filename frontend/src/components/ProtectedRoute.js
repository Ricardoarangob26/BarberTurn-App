import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Cargando...</div>; // O algún spinner
    }

    if (!user) {
        // Redirigir al login si no está autenticado
        return <Navigate to="/iniciar-sesion" replace />;
    }

    // Opcional: Si el componente se limita a ciertos roles, comprobarlo
    if (allowedRoles && Array.isArray(allowedRoles) && allowedRoles.length > 0) {
        // En nuestro CustomUserDetailsService configuramos ROLE_CLIENTE o ROLE_BARBERO
        // Pero JWT roles suelen estar en un arreglo "scopes" o "authorities" o directamente como claim.
        // Asumimos que el payload contiene al menos el `sub` (username). 
        // Si no tienes roles en el JWT, podrías simplemente dejar pasar si hay usuario.
        
        // Aquí lo ideal sería que jwtDecode te devuelva algo como user.roles o user.authorities,
        // esto dependerá de cómo enviemos el JWT... Pero por ahora, una simple autenticación basta.
    }

    return children;
};

export default ProtectedRoute;
