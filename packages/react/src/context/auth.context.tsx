import { createContext, ReactNode, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/store/store';
import { setAuthState } from '~/store/slice/auth.slice';

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

    const contextValue = useMemo(
        () => ({
            isLoggedIn,
            setIsLoggedIn: (isLoggedIn: boolean) =>
                dispatch(
                    setAuthState({
                        isLoggedIn,
                        token: '',
                        expire_at: '',
                    })
                ),
        }),
        [isLoggedIn, dispatch]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
