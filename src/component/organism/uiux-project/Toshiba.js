import React from 'react';
import CaseStudyOverview from '../../molecular/CaseStudyOverview';
import CaseStudySectionTitle from '../../molecular/CaseStudySectionTitle';
import CaseStudySectionText from '../../molecular/CaseStudySectionText';
import SmallText from '../../atom/SmallText';
import HeaderText from '../../atom/HeaderText';
import SubHeaderText from '../../atom/SubHeaderText';
import BodyText from '../../atom/BodyText';
import {Link} from 'react-router-dom';
// import all project's assets
import toshibaHomeImg from '../../../asset/toshiba/home-img.png';

import { Helmet } from 'react-helmet';

class Toshiba extends React.Component {
    constructor(props){
        super(props);
        this.toTop = this.toTop.bind(this);
    }

    toTop = () => {
        window.scrollTo(0,0);
    }

    render(){
        return(
            <>
                <Helmet>
                    <title>Toshiba Page</title>
                </Helmet>
                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col lg:flex-row justify-center px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-25% py-20 mt-24 sm:mt-40'>
                    <aside className='w-full laptop-lg:w-50% space-x-0'>
                        <div className='inline-block lg:hidden mb-2'>
                            <SmallText color='default' text={'2022 - Toshiba - UX Intern'} />
                            <HeaderText color='default' className='font-bold' text={'Optimize the Checkout Experience'} />
                        </div>
                        <img className='bg-light-tertiary-elevation rounded-md' src={toshibaHomeImg} alt='toshiba intern case study cover image' />
                    </aside>
                    <CaseStudyOverview bulletPoint={[
                        {title:'Role', text:'UX Intern'},
                        {title:'Time', text:'10 Weeks'},
                        {title:'Responsibility', text:'UX Research, Visual Design'},
                        {title:'Tools', text:'Adobe Illustrator, Figma, Miro'},
                        {title:'Overview', text:'Over the summer of 2022, I interned in the UX team at Toshiba Global Commerce Solutions to help drive a more customer-centered retail solutions.'},
                    ]} className='space-y-5' projectTitle = 'Optimize the Checkout Experience' titleDetails = '2022 - Toshiba - UX Intern' />
                </section>
                <section className='case-study-w-bg-section bg-light-tertiary-elevation dark:bg-dark-tertiary-elevation animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-25% py-20 mt-10 space-y-10'>
                    <CaseStudySectionText className=''
                        projectTitle = 'Introduction' 
                        titleDetails = 'The business' 
                        text = 'Toshiba Global Commerce Solutions (TGCS) located at the Research Triangle North Carolina, which provides the retail point-of-sale (POS) solutions such as checkout kiosk UI, hardware, in-store administration app, and operation system for the major retail and grocery stores like Costco, Wegmans, Krogers, and Harris Teeter.'
                    />
                    <CaseStudySectionText className=''
                        projectTitle = 'The Roster' 
                        titleDetails = 'UX Team Structure' 
                        text = 'The UX Team at TGCS in charge of the end-to-end process of user research and design, consisting of 6 people led by 1 design manager. The UX tasks I supported are mostly research, with some visual design tasks.'
                    />
                    <SubHeaderText color='text-light-secondary dark:text-dark-secondary' className='mt-5 font-bold underline italic' text='Most of my works here are under NDA protection, please contact me for more details.' />
                </section>
                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-25% py-20 space-y-6'>
                    <div>
                        <CaseStudySectionTitle 
                            projectTitle = 'The Main Project Work' 
                            titleDetails = 'Summary of my research contribution' 
                        />
                    </div>
                    <ul className='mt-2 list-disc pl-4 text-light-primary dark:text-dark-primary space-y-3 lg:space-y-2 font-body-text'>
                        <li className='underline'><span className='font-bold'>UX Research Refinement</span></li>
                        <ul className='mt-2 text-light-primary dark:text-dark-primary space-y-3 lg:space-y-0 font-light'>
                            <li>Defined a brand-new reporting style guide, including color, font hierarchy, and best practices of data visualization to polish a previous user research report for the retail fixed-lane POS kiosk.</li>    
                        </ul>
                        <li className='underline'><span className='font-bold'>Audio Sound Design Research</span></li>
                        <ul className='mt-2 text-light-primary dark:text-dark-primary space-y-3 lg:space-y-0 font-light'>
                            <li>Conducted secondary research (literature review), competitor analysis, and referenced ADA guideline for sound accessibility design to summarize the essential audio features to be mapped in the new retail self-checkout kiosk.</li>    
                        </ul>
                        <li className='underline'><span className='font-bold'>Storybook Research</span></li>
                        <ul className='mt-2 text-light-primary dark:text-dark-primary space-y-3 lg:space-y-0 font-light'>
                            <li>Researched a front-end tool, Storybook, which helps developer better maintain and test the components from the design system, and created a proof of concept to present to PM, design manager & the development team. The objective is to have the development team gradually adopt the framework to streamline the overall workflow.</li>    
                        </ul>
                    </ul>
                </section>
                <section className='case-study-w-bg-section bg-light-tertiary-elevation dark:bg-dark-tertiary-elevation animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-25% py-20 space-y-16'>
                    <CaseStudySectionText className=''
                        projectTitle = 'Takeaway' 
                        titleDetails = 'Lessons I learned' 
                        text = 'While my works were mostly about research, I learned a lot about the human-centered design process through my research works and participation in the weekly design critiques. This experience teaches me to gain a better sense of empathizing the user needs and helps me become a better UX practitioner. I am very grateful for this opportunity at Toshiba.'
                    />
                </section>

                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-25% py-20 space-y-4'>
                    <div className='inline-block mx-auto mb-3 xl:mx-0'>
                        <CaseStudySectionTitle 
                            projectTitle = 'Read Other Case Studies >' 
                            titleDetails = 'Navigate to other design projects' 
                        />
                    </div>
                    <ul className='flex flex-col xl:flex-row justify-between space-y-6 xl:space-y-0'>
                        <li>
                            <Link onClick={this.toTop} to={'/uiux-project/chatbot'} className=''><BodyText color='default' className='text-center underline underline-offset-8 hover:text-light-secondary dark:hover:text-dark-secondary' text={'1. Educational Design Teaching UX'} /></Link>
                        </li>
                        <li>
                            <Link onClick={this.toTop} to={'/uiux-project/ar-game'} className=''><BodyText color='default' className='text-center underline underline-offset-8 hover:text-light-secondary dark:hover:text-dark-secondary' text={'2. Design a Luxrious Experience'} /></Link>
                        </li>
                        <li>
                            <Link onClick={this.toTop} to={'/uiux-project/info-design'} className=''><BodyText color='default' className='text-center underline underline-offset-8 hover:text-light-secondary dark:hover:text-dark-secondary' text={'3. Information-driven Storytelling'} /></Link>
                        </li>
                    </ul>
                </section>
            </>
        )
    }
}

export default Toshiba;