import { createContext, useEffect, useState, useCallback } from 'react';
import propTypes from 'prop-types';

const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedPrefs = window.localStorage.getItem('current-theme');
        if (typeof storedPrefs === 'string') {
            return storedPrefs;
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
    }
    return 'light';
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ initialTheme, children }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    const checkTheme = useCallback((existing) => {
        const root = window.document.documentElement;
        const isDark = existing === 'dark';

        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(existing);

        try {
            localStorage.setItem('current-theme', existing);
        } catch (err) {
            console.error('Cannot access localStorage:', err);
        }
    }, []);

    if (initialTheme) {
        checkTheme(initialTheme);
    }

    useEffect(() => {
        checkTheme(theme);
    }, [theme, checkTheme]);

    const rawSetTheme = (rawTheme) => {
        const root = window.document.documentElement;
        const isDark = rawTheme === 'dark';

        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(rawTheme);

        localStorage.setItem('current-theme', rawTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, rawSetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    initialTheme: propTypes.string,
    children: propTypes.node.isRequired,
};