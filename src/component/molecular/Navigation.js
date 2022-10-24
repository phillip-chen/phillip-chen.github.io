import React from 'react';
import NavLink from '../atom/NavLink';
import Switch from '../atom/DarkModeSwitch';
import resume from '../../asset/phillip-chen-resume-2022.pdf';

class Navigation extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        // Track the rendering time to trigger different animation delay on home page
        if(window.location.href.slice(window.location.href.length-1,)==='/'){
            localStorage.setItem('renderCount', 0);

            return(
                <header id='top' className='animate__delay-head-init animate__animated animate__fadeIn fixed bottom-0 sm:top-0 bg-light-tertiary dark:bg-dark-tertiary px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% pt-3.5 pb-0 sm:pb-2 sm:pt-6 w-full h-14 sm:h-24'>
                    <nav className='flex flex-row justify-between'>
                        <span className='home-logo-container fixed top-0 left-0 bg-light-tertiary dark:bg-dark-tertiary sm:bg-transparent sm:relative sm:left-0 w-full sm:w-0 pt-6 pb-2 pl-5% sm:p-0'>
                            <NavLink onClick={this.handleClick} className='home-btn-logo inline-block bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary  w-12 h-12' page={''} />
                        </span>
                        <ul className='nav-section flex flex-row justify-around sm:justify-end sm:space-x-12 items-center w-full mx-auto sm:mx-0'>
                            <li>
                                <NavLink onClick={this.handleClick} page = {'work'} />
                            </li>
                            <li>
                                <NavLink page = {'about'} />
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
        }else{
            
            return(
                <header id='top' className='animate__animated animate__fadeIn fixed bottom-0 sm:top-0 bg-light-tertiary dark:bg-dark-tertiary px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% pt-3.5 pb-0 sm:pb-2 sm:pt-6 w-full h-14 sm:h-24'>
                    <nav className='flex flex-row justify-between'>
                        <span className='home-logo-container fixed top-0 left-0 bg-light-tertiary dark:bg-dark-tertiary sm:bg-transparent sm:relative sm:left-0 w-full sm:w-0 pt-6 pb-2 pl-5% sm:p-0'>
                            <NavLink onClick={this.handleClick} className='home-btn-logo inline-block bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary  w-12 h-12' page={''} />
                        </span>
                        <ul className='nav-section flex flex-row justify-around sm:justify-end sm:space-x-12 items-center w-full mx-auto sm:mx-0'>
                            <li>
                                <NavLink onClick={this.handleClick} page = {'work'} />
                            </li>
                            <li>
                                <NavLink page = {'about'} />
                            </li>
                            <li>
                                <NavLink page = {'resume'} />
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
}

export default Navigation;