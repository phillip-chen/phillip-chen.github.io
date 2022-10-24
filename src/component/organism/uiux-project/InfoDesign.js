import React from 'react';
import CaseStudyOverview from '../../molecular/CaseStudyOverview';
import CaseStudySectionTitle from '../../molecular/CaseStudySectionTitle';
import CaseStudySectionText from '../../molecular/CaseStudySectionText';
import BodyText from '../../atom/BodyText';
import SmallText from '../../atom/SmallText';
import HeaderText from '../../atom/HeaderText';
import SubHeaderText from '../../atom/SubHeaderText';
import {Link} from 'react-router-dom';

// import all project's assets
import infoDesignHomeImg from '../../../asset/info-design/home-img.png';
import wormSketch from '../../../asset/info-design/worm-sketch.png';
import wormMoodBoard from '../../../asset/info-design/worm-moodboard.png';
import wormInfographic from '../../../asset/info-design/infographic-worm.png';
import sportsSketch from '../../../asset/info-design/sports-sketch.png';
import sportsMoodBoard from '../../../asset/info-design/sports-moodboard.png';
import sportsInfographic from '../../../asset/info-design/infographic-sports.png';

class InfoDesign extends React.Component {
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
                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col lg:flex-row justify-center px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-10 mt-24 sm:mt-28 2xl:mt-5%'>
                        <aside className='w-full space-x-0'>
                            <div className='inline-block lg:hidden mb-2'>
                                <SmallText color='default' text={'2021-2022 Collection of Information Design Projects'} />
                                <HeaderText color='default' className='font-bold' text={'Information-Driven Storytelling'} />
                            </div>
                            <img className='bg-light-tertiary-elevation rounded-md' src={infoDesignHomeImg} alt='information design projects cover image' />
                        </aside>
                        <CaseStudyOverview bulletPoint={[
                            {title:'Role', text:'Designer'},
                            {title:'Time', text:'2021 - 2022'},
                            {title:'Responsibility', text:'Research, Ideation, Information Design'},
                            {title:'Tools', text:'Excel, Adobe Illustrator, Adobe Photoshop'},
                            {title:'Overview', text:['A collection of information design projects I did during my time at UNC Chapel Hill, demonstrating my ability to design a powerful data-driven storytelling']},

                        ]} className='space-y-5' projectTitle = 'Information-Driven Storytelling' titleDetails = '2021-2022 Collection of Information Design Projects' />
                </section>
                <section className='case-study-w-bg-section bg-light-tertiary-elevation dark:bg-dark-tertiary-elevation animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-10 mt-10 space-y-10'>
                    <CaseStudySectionText className=''
                        projectTitle = 'The Great Sho' 
                        titleDetails = 'Entertainment Theme of Infographic Design' 
                        text = {['In this infographic course project, we were been tasked to produce an infographic design featuring an entertainment theme. I decided to design an infographic about an iconic baseball player - Shohei Ohtani. This project also won the ', <a href='http://hussman.unc.edu/news/students-win-big-society-news-design-international-awards' target='_blank' className='underline text-light-secondary dark:text-dark-secondary'>The 3rd place infographic award</a>, ' in the 2022 MSUSND College News Design Contest.']}
                    />
                    <div>
                        <BodyText color='default' className='mt-1 font-bold underline' text={'Tools:'} />
                        <ul className='mt-6 list-disc pl-4 text-light-primary dark:text-dark-primary space-y-3 lg:mt-4 lg:space-y-2 font-body-text'>
                            <li><span className='font-bold'>MS Excel:</span> Using spreadsheet to filter and generate simple charts to look for insightful stories.</li>
                            <li><span className='font-bold'>Adobe Illustrator:</span> Design vector graphics including all the data charts, and other vector graphics.</li>
                        </ul>
                    </div>
                    <div className='flex flex-row space-x-5'>
                        <aside className='w-full'>
                            <img className='rounded-md' src={sportsSketch} alt='sketch of the sports infographic' />
                            <SmallText color='text-light-primary dark:text-dark-primary' className='text-center mt-2' text={'Initial Sketch'} />
                        </aside>
                        <aside className='w-full'>
                            <img className='rounded-md' src={sportsMoodBoard} alt='mood board of the sports infographic' />
                            <SmallText color='text-light-primary dark:text-dark-primary' className='text-center mt-2' text={'Mood Board - Gathered from Pinterest'} />
                        </aside>
                    </div>
                    <div>
                        <img className='rounded-md' src={sportsInfographic} alt='final design of the sports infographic' />
                        <SmallText color='text-light-primary dark:text-dark-primary' className='text-center mt-2' text={'Final Design'} />
                    </div>
                </section>
                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col justify-center px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-10 space-y-10'>
                    <CaseStudySectionText className=''
                                projectTitle = 'The Global Worming Problem' 
                                titleDetails = 'Infographic Design with Organic Details' 
                                text = {['This project is one of my infographic course projects where we were been tasked to produce any topic of infographic with organic details. I decided to do a research and design an infographic about the big worms either fictionally live in the sci-fi movies, or allegeably exist in the world.']}
                    />
                    <div>
                        <BodyText color='default' className='mt-1 font-bold underline' text={'Tools:'} />
                        <ul className='mt-6 list-disc pl-4 text-light-primary dark:text-dark-primary space-y-3 lg:mt-4 lg:space-y-2 font-body-text'>
                            <li><span className='font-bold'>Adobe Photoshop:</span> Using smudge, dodge, and burn tools to add organic texture to the worm and the background.</li>
                            <li><span className='font-bold'>Adobe Illustrator:</span> Design vector graphics including information graphics, and worm graphics.</li>
                        </ul>
                    </div>
                    <div className='flex flex-row space-x-5'>
                        <aside className='w-full'>
                            <img className='rounded-md' src={wormSketch} alt='sketch of the worm infographic' />
                            <SmallText color='text-light-primary dark:text-dark-primary' className='text-center mt-2' text={'Initial Sketch'} />
                        </aside>
                        <aside className='w-full'>
                            <img className='rounded-md' src={wormMoodBoard} alt='mood board of the worm infographic' />
                            <SmallText color='text-light-primary dark:text-dark-primary' className='text-center mt-2' text={'Mood Board - Gathered from Pinterest'} />
                        </aside>
                    </div>
                    <div>
                        <img className='rounded-md' src={wormInfographic} alt='final design of the worm infographic' />
                        <SmallText color='text-light-primary dark:text-dark-primary' className='text-center mt-2' text={'Final Design'} />
                    </div>
                </section>
                <section className='case-study-w-bg-section bg-light-tertiary-elevation dark:bg-dark-tertiary-elevation animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-10 mt-10 space-y-10'>
                    <CaseStudySectionText className=''
                        projectTitle = 'Takeaway' 
                        titleDetails = 'Lessons I learned' 
                        text = {'I was struggled a lot at the beginning as I had never used Adobe Creative Suite other than XD before. I spent a lot of time and was thrilled to see the final designs been pulled off together. I learned how to better validate the data and how to design better ways of delivering powerful information-driven stories.'}
                    />
                </section>
                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-10 space-y-4'>
                    <div className='inline-block mx-auto mb-3 xl:mx-0'>
                        <CaseStudySectionTitle 
                            projectTitle = 'Read Other Case Studies >' 
                            titleDetails = 'Navigate to other design projects' 
                        />
                    </div>
                    <ul className='flex flex-col xl:flex-row justify-between space-y-6 xl:space-y-0'>
                        <li>
                            <Link onClick={this.toTop} to={'/uiux-project/toshiba'} className=''><SubHeaderText color='default' className='font-thin text-center underline underline-offset-8 hover:text-light-secondary dark:hover:text-dark-secondary' text={'1. Optimize the Checkout Experience'} /></Link>
                        </li>
                        <li>
                            <Link onClick={this.toTop} to={'/uiux-project/chatbot'} className=''><SubHeaderText color='default' className='font-thin text-center underline underline-offset-8 hover:text-light-secondary dark:hover:text-dark-secondary' text={'2. Educational Design Teaching UX'} /></Link>
                        </li>
                        <li>
                            <Link onClick={this.toTop} to={'/uiux-project/ar-game'} className=''><SubHeaderText color='default' className='font-thin text-center underline underline-offset-8 hover:text-light-secondary dark:hover:text-dark-secondary' text={'3.  Design a Luxrious Experience'} /></Link>
                        </li>
                    </ul>
                </section>
            </>
        );
    }
}

export default InfoDesign;