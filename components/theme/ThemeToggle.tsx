'use client';
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';

const ThemeToggle = () => {
	const [darkTheme, setDarkTheme] = useState(false);

	useEffect(() => {
		const theme = localStorage.getItem('theme');
		if (theme === 'dark') {
			setDarkTheme(true);
		} else {
			setDarkTheme(false);
		}
	}, []);

	useEffect(() => {
		if (darkTheme) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [darkTheme]);

	return (
		<div
            className='cursor-pointer'
        >
            {darkTheme ? <SunIcon onClick={() => setDarkTheme(!darkTheme)} /> : <MoonIcon onClick={() => setDarkTheme(!darkTheme)} />}
		</div>
	);
};

export default ThemeToggle;