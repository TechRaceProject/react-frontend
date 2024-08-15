import { createContext, ReactNode, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/store/store';
import { setAuthState } from '~/store/slice/auth.slice';
import { UserState } from '~/store/slice/user.slice';
import { initialState } from '~/store/slice/user.slice';

interface AuthContextType {
    isLoggedIn: boolean;
    user: UserState;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    user: initialState,
    setIsLoggedIn: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const contextValue = useMemo(
        () => ({
            isLoggedIn,
            user,
            setIsLoggedIn: (isLoggedIn: boolean) =>
                dispatch(
                    setAuthState({
                        isLoggedIn,
                        token: '',
                    })
                ),
        }),
        [isLoggedIn, user, dispatch]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
