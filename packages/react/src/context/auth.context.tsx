import { createContext, ReactNode, useMemo } from 'react';
// import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/store/store';
import { setLoginState } from '~/store/slice/auth.slice';

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    // const [lastLoggedInStatus, setLastLoggedInStatus] = useState(isLoggedIn);

    // useEffect(() => {
    //     if (lastLoggedInStatus) {
    //         window.location.reload();
    //     }
    //     setLastLoggedInStatus(isLoggedIn);
    // }, [isLoggedIn, lastLoggedInStatus]);

    const contextValue = useMemo(
        () => ({
            isLoggedIn,
            setIsLoggedIn: (isLoggedIn: boolean) =>
                dispatch(setLoginState(isLoggedIn)),
        }),
        [isLoggedIn, dispatch]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
