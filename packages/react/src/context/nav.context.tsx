import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/store/store';
import { toggleNavState } from '~/store/slice/nav.slice';

interface NavContextType {
    isOpen: boolean;
    setisOpen: () => void;
}

export const NavContext = createContext<NavContextType>({
    isOpen: true,
    setisOpen: () => {},
});

interface NavProviderProps {
    children: ReactNode;
}

export function NavProvider({ children }: NavProviderProps) {
    const reduxIsOpen = useSelector((state: RootState) => state.nav.isOpen);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(reduxIsOpen);

    useEffect(() => {
        if (reduxIsOpen !== isOpen) {
            setIsOpen(reduxIsOpen);
        }
    }, [reduxIsOpen, isOpen]);

    const contextValue = useMemo(
        () => ({
            isOpen,
            setisOpen: () => {
                dispatch(toggleNavState());
            },
        }),
        [isOpen, dispatch]
    );
    return (
        <NavContext.Provider value={contextValue}>
            {children}
        </NavContext.Provider>
    );
}
