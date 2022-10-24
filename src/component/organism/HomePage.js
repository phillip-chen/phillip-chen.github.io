import React from 'react';
import Header from '../atom/HeaderText';
import SubHeader from '../atom/SubHeaderText';
import BodyText from '../atom/BodyText';
import IconNavList from '../molecular/IconNavList';
import Dropdown from '../molecular/Dropdown';
import ProjectCard from '../molecular/ProjectCard';
import LogoLoader from '../atom/LogoLoader';
import resume from '../../asset/phillip-chen-resume-2022.pdf';
  

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            animation1:'animate__animated animate__delay-banner-init animate__fadeInDown ',
            animation2: 'animate__animated animate__delay-body-init animate__fadeIn ',
            loader: <LogoLoader className='w-24 laptop-md:w-28 laptop-lg:w-40' />
        }
        this.renderCount = this.renderCount.bind(this);
    }
    
    // Define a method inside the home page component to dynamically render different animation / delays per section of the home page
    renderCount = (animation) =>{

        if(Number(localStorage.getItem('renderCount'))>0){
            return {
                animation1:'animate__animated animate__fadeIn ',
                animation2:'animate__animated animate__fadeIn ',
                loader: <></>
            };
        }else{
            localStorage.setItem('renderCount', 1);
            return animation;
        }

    }


    render(){
        
        let animation = this.renderCount(this.state);

        return (
            <>
                {animation.loader}
                <section className={animation.animation1 + 'home-text-section px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-10 mt-24 sm:mt-40 2xl:mt-60 space-y-6 md:space-y-5 2xl:space-y-7'}>
                    <Header color='default' className='' text={"Hi! I am Yi-Tsung (Phillip) Chen"} />
                    <SubHeader color='default' className='' text={["A UX Designer / Developer studying Information Science at the University of North Carolina - Chapel Hill. Previously tackled user problems at ", <span key='important-text-1' className='font-bold text-light-secondary dark:text-dark-secondary'>Toshiba</span>, " & ", <span key='important-text-2' className='font-bold text-light-secondary dark:text-dark-secondary'>UNC BSI Lab</span>]} />
                    <BodyText color='default' className='' text = {["Seeking full time opportunities for 2023, view my ", <a key='important-text-1' href={resume} className='font-bold text-light-secondary dark:text-dark-secondary underline decoration-1 underline-offset-2 decoration-wavy'  target='_blank'>RESUME</a>, " or shoot me an ", <a key='important-text-2' href='mailto:yitsung.chen95@gmail.com' className='font-bold text-light-secondary dark:text-dark-secondary underline underline-offset-2 decoration-1 decoration-wavy'>EMAIL</a>, ". I am always down for a chat."]} />
                    <IconNavList />
                </section>
                <section className={animation.animation2 + 'project-section px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% pt-10 pb-5 mt-6 2xl:mt-32'}>
                    <div className=' border-b border-light-primary dark:border-dark-primary project-title flex flex-row justify-between py-1.5 mb-6'>
                        <Header color='default' className="inline-block" text={'Projects'} />
                        <Dropdown />
                    </div>
                    <div className='flex flex-col flex-wrap md:flex-row justify-between gap-y-4'>
                        <ProjectCard className = 'animate__animated animate__fast ' projectType='uiux-project' projectName='chatbot' projectTags = {['UX Design', 'Visual Design', 'Emerging Tech']} projectSubTitle={'2022 - UNC BSI Lab - Client Sponsored Project'} projectTitle={'Educational Design Teaching UX'} />
                        <ProjectCard className = 'animate__animated animate__fast ' projectType='uiux-project' projectName='toshiba' projectTags = {['UX Research', 'UX Design', 'Visual Design']} projectSubTitle={'2022 - Toshiba - UX Internship'} projectTitle={'Optimize the Checkout Experience'} />
                        <ProjectCard className = 'animate__animated animate__fast ' projectType='uiux-project' projectName='ar-game' projectTags = {['UX Design', 'Emerging Tech', 'UI Development']} projectSubTitle={'2022 - UNC BSI Lab - Client Sponsored Project'} projectTitle={'Design a Luxrious Experience'} />
                        <ProjectCard className = 'animate__animated animate__fast ' projectType='uiux-project' projectName='info-design' projectTags = {['Research', 'Data Visualization', 'Visual Design']} projectSubTitle={'2021-2022 Collection of Information Design Projects'} projectTitle={'Information-Driven Storytelling'} />
                        <ProjectCard className = 'animate__animated animate__fast ' projectType='dev-project' projectName='movie-dash' projectTags = {['HTML', 'CSS', 'JS', 'Ajax', 'D3.js']} projectSubTitle={'2021 - Visual Analytics Course Project'} projectTitle={'Movie Anaytics Dashboard'} projectDetails = {'Desgined and built an interactive dashboard for serious movie fans and production firms to consume data-driven inisghts through real-time data fetching from TMDB API.'} />
                        <ProjectCard className = 'animate__animated animate__fast ' projectType='dev-project' projectName='cola-war' projectTags = {['React', 'Material UI', 'ChartJS']} projectSubTitle={'2022 - Interactive Media Course Project'} projectTitle={'Cola War Educational Website'} projectDetails = {'Built a website teaches the history and fun facts of the cola war for high school students and designed a short quiz at the end to test the audiences\' soda knowledge.'} />
                        <ProjectCard className = 'animate__animated animate__fast ' projectType='dev-project' projectName='cv-kiosk' projectTags = {['HTML', 'CSS', 'JS', 'Tensorflow.js']} projectSubTitle={'2022 - UNC BSI Lab - Clent Sponsored Project'} projectTitle={'Facial Recognition Kiosk Frame'} projectDetails = {'Developed a facial recognition kiosk by Tensorflow.js that triggers a deep-fake portrait to talk to the guests as a gateway of an AR treasure hunting game.'} />
                        <ProjectCard className = 'animate__animated animate__fast ' projectType='dev-project' projectName='web-dash-design' projectTags = {['CSS', 'Bootstrap', 'Adobe Illustrator']} projectSubTitle={'2022 - Interactive Media Course Project'} projectTitle={'Web Data Dashboard Design'} projectDetails = {'Designed a responsive web data dashboard using Bootstrap based on a real-client\'s past web design mockup in a Photoshop file.'} />                        
                    </div>
                </section>
            </>
        )

    }


}

export default HomePage;