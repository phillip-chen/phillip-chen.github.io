import React from 'react';
import NavLinkComponent from '../atom/NavLinkComponent';
import Switch from '../atom/DarkModeSwitch';
import resume from '../../asset/phillip-chen-resume.pdf';

class Navigation extends React.Component{
    constructor(props){
        super(props);

    }

    render(){

        if(window.location.href.slice(window.location.href.length-1,)==='/'){
            localStorage.setItem('renderCount', 0);
        }

        return(
            <header id='top' className={`${Number(localStorage.getItem('renderCount'))>0?"":"animate__delay-head-init"} animate__animated animate__fadeIn fixed bottom-0 sm:top-0 bg-light-tertiary dark:bg-dark-tertiary px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-25% pt-3.5 pb-0 sm:pb-2 sm:pt-6 w-full h-14 sm:h-24`}>
                <nav className='flex flex-row justify-between'>
                    <span className='home-logo-container fixed top-0 left-0 bg-light-tertiary dark:bg-dark-tertiary sm:bg-transparent sm:relative sm:left-0 w-full sm:w-0 pt-6 pb-2 pl-5% sm:p-0'>
                        <NavLinkComponent className='home-btn-logo inline-block bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary  w-12 h-12' page={''} />
                    </span>
                    <ul className='nav-section flex flex-row justify-around sm:justify-end sm:space-x-12 items-center w-full mx-auto sm:mx-0'>
                        <li>
                            <NavLinkComponent page = {'work'} end="end" />
                        </li>
                        <li>
                            <NavLinkComponent page = {'about'} end="" />
                        </li>
                        <li>
                            <a href={resume} target='_blank' className='nav-link border-b border-transparent tracking-wider font-body-text text-sm text-light-primary dark:text-dark-primary hover:border-light-primary dark:hover:border-dark-primary duration-300'>
                                RESUME
                            </a>
                        </li>
                        <li>
                            <Switch />
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Navigation;