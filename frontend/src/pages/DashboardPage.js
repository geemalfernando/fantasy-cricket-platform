import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const DashboardPage = () => {
    const { user, setUser } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for token and user in localStorage
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token || !storedUser) {
            alert('You must log in first!');
            navigate('/login'); // Redirect to login if not authenticated
        } else {
            setUser(JSON.parse(storedUser)); // Restore user data
        }
    }, [navigate, setUser]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <div>
            <h1>Welcome, {user?.username}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default DashboardPage;
