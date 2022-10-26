import React from 'react';
import SmallText from '../atom/SmallText';
import IconNavList from './IconNavList';

class Footer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <footer className='text-light-primary dark:text-dark-primary animate__delay-body-2nd animate__animated animate__fadeIn px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-25% py-5 mb-24 sm:mb-10 lg:mb-0 flex flex-col items-center'>
                <IconNavList />
                <SmallText className={'mt-4'} text = {[String.fromCharCode(169), ' ', new Date().getFullYear(), ' ', 'Yi-Tsung (Phillip) Chen.', ' ', <span key='footer-text' className='hidden sm:inline-block'>Built from scratch with React & Tailwind CSS</span>]} />
            </footer>
        )
    }
}

export default Footer;