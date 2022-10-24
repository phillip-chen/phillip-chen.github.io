import * as React from 'react';
import { useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Switch = () => {

  const useDarkSide = () => {
    const [theme, setTheme] = useState(localStorage.theme);
    const colorTheme = theme === 'dark' ? 'light' : 'dark';

    useEffect(()=>{
      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);

      theme === 'dark' ?  document.body.classList.add('darkbg') : document.body.classList.remove('darkbg');

      //Save theme to Local Storage
      localStorage.setItem('theme', theme);

    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
  }
  
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(colorTheme ==='light' ? true : false);

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };




  return (
    <div className='rounded-full p-1'>
      <DarkModeSwitch
          style={{ marginBottom: '0' }}
          checked={darkSide}
          onChange={toggleDarkMode}
          size={24}
          sunColor = {'#20293A'}
          moonColor = {'#fff'}
      />
    </div>
  );
};

export default Switch;