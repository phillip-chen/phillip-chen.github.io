import React from 'react';
import Header from '../atom/HeaderText';
import SubHeaderText from '../atom/SubHeaderText';
import BodyText from '../atom/BodyText';
import headShot from '../../asset/head-shot.png';

import { Helmet } from 'react-helmet';


class AboutPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        
        return(
            <>
                <Helmet>
                    <title>Yi-Tsung (Phillip) Chen | About</title>
               </Helmet>
                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col xl:flex-row px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-25% py-10 mt-24 sm:mt-40 2xl:mb-2% space-x-0 xl:space-x-10'>
                    <aside className='img-section flex flex-col space-y-5'>
                        <img className='h-full w-full sm:w-60% md:w-45% lg:w-40% xl:w-full profile-pic rounded-md border-4 border-light-secondary dark:border-dark-secondary' src={headShot} />
                    </aside>
                    <aside className='text-section flex flex-col justify-between space-y-5'>
                        <Header color='default' className={'mt-5 xl:mt-0'} text={"Hello! Nice to meet you"} />
                        <BodyText color='default' className='' text='My name is Yi-Tsung Chen, also go by Phillip. 
                        I am a graduate student studying information Science with a focus on Human-Computer Interaction
                        Design at UNC - Chapel Hill. Go Tar Heels!
                        ' />
                        <BodyText color='default' className='' text='I enjoy solving puzzles and building solutions. 
                        With my experience in business analytics, design thinking, and software development, I aspire to utilize my skills 
                        to make a positive impact and shape a better world.
                        ' />
                        <BodyText color='default' className='' text={
                            [
                                'Outside my work, I love to travel around the globe, I am lucky enough to have traveled to 10+ countries. I also love drinks, enjoying a cup of coffee in the morning, craft beers at Friday nights, and boba teas whenever possible.',
                            ]
                        }
                        />
                    </aside>
                </section>

                <section className='case-study-w-bg-section bg-light-tertiary-elevation dark:bg-dark-tertiary-elevation animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-25% py-20 space-y-10 2xl:mb-10'>
                    <div className='space-y-5'>
                        <Header color='default' className={'mt-5 xl:mt-0'} text={"My Skills & Interests"} />
                        <BodyText color='default' className='' text={'I have experiences working on Business Analytics, A/B Testing, Data Visualization Design, UX Design, and Front-end Web Development. My niche interest lies in the intersection of these 3 fields in particular:'} />
                    </div>
                    <div className='flex flex-col lg:flex-row justify-between mt-4 space-y-4 lg:space-y-0'>
                        <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-30% text-center py-4 flex items-center justify-center'>
                            <BodyText color='default' className='font-bold' text={['UI/UX Design']} />
                        </span>
                        <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-30% text-center py-4 flex items-center justify-center'>
                            <BodyText color='default' className='font-bold' text={['Data Visualization']} />
                        </span>
                        <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-30% text-center py-4'>
                            <BodyText color='default' className='font-bold' text={['Web Development']} />
                        </span>
                    </div>
                    <div className='space-y-5'>
                        <Header color='default' className={'mt-5 xl:mt-0'} text={"Personal Goal"} />
                        <BodyText color='default' className='' text={'My long-term goal is to open up my own brewery, but really, my ultimate goal is to become a better problem solver in virtually any domain. I also enjoy working with people from all walks of lives, inspiring creativity and novel ideas together!'} />
                        <BodyText color='default' className='' text={
                            [
                                'If you like to get in touch with me, shoot me an ',
                                <a key='important-text-1' href='mailto:yitsung.chen95@gmail.com' target='_blank' className='font-bold text-light-secondary dark:text-dark-secondary underline underline-offset-2 decoration-1 decoration-wavy'>Email</a>,
                                ' or connect through my ',
                                <a key='important-text-2' href='https://www.linkedin.com/in/yi-tsung-c-795815b7/' target='_blank' className='font-bold text-light-secondary dark:text-dark-secondary underline underline-offset-2 decoration-1 decoration-wavy'>LinkedIn</a>,
                                '. I am always down for a chat!'
                            ]
                        }
                        />
                    </div>
                </section>
            </>
        )
    }
}

export default AboutPage;