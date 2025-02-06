import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Create the UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// PropTypes for validation
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook for consuming context easily
export const useUser = () => {
    return useContext(UserContext);
};
