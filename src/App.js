import { HashRouter, Route, Routes } from 'react-router-dom';
import React from 'react';

import './style/main-style.css';
import './style/logo-animation.css';
// Fixed Components
import Navigation from './component/molecular/Navigation';
import Footer from './component/molecular/Footer';

// Routing Pages
import ToTopBtn from './component/atom/ToTopBtn';
import HomePage from './component/organism/HomePage';
import AboutPage from './component/organism/AboutPage';
// Case Study Page
import ChatBot from './component/organism/uiux-project/ChatbotProject';
import Toshiba from './component/organism/uiux-project/Toshiba';
import ARProject from './component/organism/uiux-project/ARProject';
import InfoDesign from './component/organism/uiux-project/InfoDesign';
import ReactGa from 'react-ga';


class App extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        
        ReactGa.initialize('G-GLHKSTM3M9');
        // to report page view
        ReactGa.pageview(window.location.hash + window.location.search);
    }

    render(){
        return(
            <HashRouter>      
                <Navigation />
                <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/about' element={<AboutPage />}></Route>
                <Route path='/uiux-project/chatbot' element={<ChatBot />}></Route>
                <Route path='/uiux-project/toshiba' element={<Toshiba />}></Route>
                <Route path='/uiux-project/ar-game' element={<ARProject />}></Route>
                <Route path='/uiux-project/info-design' element={<InfoDesign />}></Route>
                </Routes>
                <ToTopBtn className='to-top-btn fixed bottom-14 w-full sm:bottom-0 xl:right-4.5% laptop-md:right-6% laptop-lg:right-10% text-sm duration-0' text = 'Back To Top' sectionName = 'top' />
                <Footer />
            </HashRouter>
        );
    }
}

export default App;