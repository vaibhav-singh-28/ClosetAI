import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const AppContent = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/is-Auth');
            if (data.success) {
                setIsLoggedin(true);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data');
            data.success
                ? setUserData(data.userData)
                : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Check auth status once when the app loads
    useEffect(() => {
        getAuthState();
    }, []);

    // Whenever login state becomes true, load user data automatically
    useEffect(() => {
        if (isLoggedin) {
            getUserData();
        }
    }, [isLoggedin]);

    const value = {
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
    };

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    );
};