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
import ARHomeImg from '../../../asset/ar-game/home-img.png';
import demo from '../../../asset/ar-game/ar-game-demo.mp4';
import ideation from '../../../asset/ar-game/ideation.png';
import story from '../../../asset/ar-game/story-script.png';
import floor from '../../../asset/ar-game/floor-plan.png';
import flow from '../../../asset/ar-game/user-flow.png';
import filmingSet from '../../../asset/ar-game/filming-set.png';
import finalScreen from '../../../asset/ar-game/final-screens.png';
import reward from '../../../asset/ar-game/reward-map.png';
import cv from '../../../asset/ar-game/cv-work.png';
import storyScript from '../../../asset/ar-game/GW-Game-story.pdf';


class ARProject extends React.Component {
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
                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col lg:flex-row justify-center px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-10 mt-24 sm:mt-40'>
                    <aside className='w-full space-x-0'>
                        <div className='inline-block lg:hidden mb-2'>
                            <SmallText color='default' text={'2022 - UNC BSI Lab - Client Sponsored Project'} />
                            <HeaderText color='default' className='font-bold' text={'Design a Luxrious Experience'} />
                        </div>
                        <img className='bg-light-tertiary-elevation rounded-md' src={ARHomeImg} alt='Hotel AR game project cover image' />
                    </aside>
                    <CaseStudyOverview bulletPoint={[
                        {title:'Role', text:'UI/UX Developer'},
                        {title:'Time', text:'10 Weeks'},
                        {title:'Responsibility', text:'Research, Ideation, UI Development'},
                        {title:'Tools', text:'Adobe XD, VS Code'},
                        {title:'Overview', text:'Leverage emerging technologies to form a unique and memorable guest experience for a Fortune 500 hotel brand\'s luxrious branch at Washington D.C.'},
                    ]} className='space-y-5' projectTitle = 'Design a Luxrious Experience' titleDetails = '2022 - UNC BSI Lab - Client Sponsored Project' />
                </section>

                <section className='case-study-w-bg-section bg-light-tertiary-elevation dark:bg-dark-tertiary-elevation animate__delay-body animate__animated animate__fadeIn flex flex-col lg:flex-row justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-20 mt-10'>
                    <aside className='rounded-md'>
                        <div className='inline-block lg:hidden mb-2'>
                            <CaseStudySectionTitle 
                                    projectTitle = 'The Final Solution Demo' 
                                    titleDetails = 'A glimpse to our final solution' 
                            />
                        </div>
                        <video controls className='w-60% lg:w-auto rounded-md' alt={'chatbot project\'s solution video'} >
                            <source src={demo} type="video/mp4" />
                        </video>
                    </aside>
                    <aside className='px-0 lg:px-7 space-y-16 flex flex-col justify-center'>
                        <CaseStudySectionText className='' titleDisplay = 'hidden lg:inline-block'
                            projectTitle = 'The Final Solution Demo' 
                            titleDetails = 'A glimpse to our final solution' 
                            text = {'Take a look at our final solution. The video demonstrates the user flow of our solution approaching a hotel\'s luxrious experience. Video was shot by the story and video team members with quality editing production.'}
                        />
                        <CaseStudySectionText className=''
                            projectTitle = 'The Impact' 
                            titleDetails = 'Final Result' 
                            text = 'The solution gave fresh input to the decision makers of the luxrious hotel branch. While we did not get an immediate approval, they were considering the possibility of other hotel branches that have the right resources to execute our solution.'
                        />
                    </aside>
                </section>

                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-20 space-y-16'>
                    <CaseStudySectionText className=''
                            projectTitle = 'The Context' 
                            titleDetails = 'How it begins' 
                            text = {'The project began where one of the hotel\'s luxrious branch approached the lab and sought novel ideas to help them create a unique and memorable guest experience while the travelers staying in.'}
                    />
                    <CaseStudySectionText className=''
                            projectTitle = 'The Contraints' 
                            titleDetails = 'Project Scope' 
                            text = 'The main constraint is budget. For this project, a lot of our solution concepts require external expertise and resources to speed up the production and simulate a real-world experience. For example, we had to find professional actor and actress to help film and record some of the story scripts.'
                    />
                </section>

                <section className='case-study-w-bg-section bg-light-tertiary-elevation dark:bg-dark-tertiary-elevation animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-20 space-y-16'>
                    <aside>
                        <CaseStudySectionTitle 
                                projectTitle = 'Define the Problems' 
                                titleDetails = 'Set up the design objective' 
                        />
                        <BodyText color='default' className='mt-1 font-thin' text='We started by defining our design question:' />
                        <SubHeaderText color='text-light-secondary dark:text-dark-secondary' className='mt-5 font-bold underline italic' text='How might we create a unique and memorable experience for a luxrious hotel?' />
                    </aside>
                    <aside>
                        <CaseStudySectionTitle 
                                projectTitle = 'Research Insights' 
                                titleDetails = 'Analyzing the problems' 
                        />
                        <BodyText color='default' className='mt-1 font-thin' text={['We gathered information from the client input and conducted a field study on one of the hotel\'s branches. These research helped us understand ', <span key='bold-text-key-points' className='font-bold'>3 key points</span>, ' about what it means to have a ',<span key='bold-tex-luxrious-experience' className='font-bold underline'>luxrious experience:</span>]} />
                        <ul className='mt-6 list-disc pl-4 text-light-primary dark:text-dark-primary space-y-3 lg:mt-5 lg:space-y-2 font-body-text'>
                            <li><span className='font-bold'>Uniqueness:</span> Offer a nowhere-but-here experience to bring customers back for more.</li>
                            <li><span className='font-bold'>Personalization:</span> Tailor the guest experience for different user needs during their stay.</li>
                            <li><span className='font-bold'>Localization:</span> Extend the experience beyonds hotel to the cultural value of the local community.</li>
                        </ul>
                    </aside>
                </section>

                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-20 space-y-12'>
                    <div>
                        <CaseStudySectionText className=''
                                projectTitle = 'Ideation Process' 
                                titleDetails = 'Brainstorming possible solutions' 
                                text = {['With the research results coupled by the lab\'s available resources, our ideas centering around ', <span key='bold-lab-strength' className='font-bold'>leveraging emerging technology to form a luxrious experience for hotel guests.</span>]}
                        />
                        <BodyText color='default' className='mt-6 font-thin' text={'As we brainstorming different ideas, we try to come up with a technological solution that are unexpected by the guest but not unwelcoming, and also to fully scale for different locations without damaging the hotel\'s hisotrical aesthetics.'} />
                    </div>
                    <div className='flex flex-col lg:flex-row'>
                        <aside className='space-x-0 w-full lg:w-50%'>
                            <div className='inline-block lg:hidden'>
                                <CaseStudySectionTitle 
                                        projectTitle = 'Parking Lot' 
                                        titleDetails = '' 
                                />
                            </div>
                            <img className='rounded-md' src={ideation} alt='ideation whiteboard photo' />
                            <SmallText color='text-light-primary dark:text-dark-primary' className='text-center mt-2' text={'Ideation Cards'} />
                        </aside>
                        <aside className='flex flex-col px-0 lg:px-4 space-y-6'>
                            <div className='hidden lg:inline-block mt-2'>
                                <CaseStudySectionTitle 
                                        projectTitle = 'Parking Lot' 
                                        titleDetails = ''
                                />
                            </div>
                            <BodyText color='default' className='font-thin' text={'During the ideation process, each member of the team wrote down potential solutions that leveraged 3 types of emerging technologies on a deck of cards.'} />
                            <BodyText color='default' className='font-thin' text={'Based on the time, resources, and topic relevancy, we extracted ideas that are more pragmatic while parking lot the rest.'} />

                        </aside>
                    </div>
                    <div>
                        <SubHeaderText color='default' className='font-bold' text = {'Final Iteration'} />
                        <BodyText color='default' className='mt-2 font-thin' text={'Upon discussion, we decided to leverage Augmented Reality (AR) to produce a scavenger hunt featuring a story that engage with the hotel\'s indoor facilities while enhancing the cultural & historical value of the hotel\'s location, Washington D.C.'} />
                        <ul className='list-disc pl-4 text-light-primary dark:text-dark-primary mt-6'>
                            <li>Three Emerging Technologies</li>
                        </ul>
                        <div className='flex flex-col lg:flex-row justify-between mt-4 space-y-4 lg:space-y-0'>
                            <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-30% text-center py-4'>
                                <BodyText  color='default' className='font-bold' text={['Augmented', <br key='line-brk' /> ,'Reality']} />
                            </span>
                            <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-30% text-center py-4'>
                                <BodyText color='default' className='font-bold' text={['Facial', <br key='line-brk' /> ,'Recognition']} />
                            </span>
                            <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-30% text-center py-4'>
                                <BodyText color='default' className='font-bold' text={['Deep', <br key='line-brk' /> ,'Fake']} />
                            </span>
                        </div>
                        <ul className='list-disc pl-4 text-light-primary dark:text-dark-primary mt-6'>
                            <li>Value Propositions</li>
                        </ul>
                        <div className='flex flex-col lg:flex-row justify-between mt-4 space-y-4 lg:space-y-0'>
                            <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-20% text-center py-4 flex items-center justify-center'>
                                <BodyText color='default' className='font-bold' text={['Pleasant', <br key='line-brk' /> ,'Surprise']} />
                            </span>
                            <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-20% text-center py-4 flex items-center justify-center'>
                                <BodyText color='default' className='font-bold' text={['Collectible', <br key='line-brk' /> ,'Experience']} />
                            </span>
                            <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-20% text-center py-4'>
                                <BodyText color='default' className='font-bold' text={['Ehance', <br key='line-brk' /> ,'Historical', <br key='line-brk-2' />, 'Value']} />
                            </span>
                            <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-20% text-center py-4'>
                                <BodyText color='default' className='font-bold' text={['Reward all', <br key='line-brk' /> ,'Levels of', <br key='line-brk-2' />, 'Engagement']} />
                            </span>
                        </div>
                    </div>
                </section>

                <section className='case-study-w-bg-section bg-light-tertiary-elevation dark:bg-dark-tertiary-elevation animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-20 space-y-16'>
                    <div className='flex flex-col lg:flex-row'>
                        <aside className='space-x-0 w-80% xl:w-60%'>
                            <div className='inline-block lg:hidden'>
                                <CaseStudySectionTitle 
                                        projectTitle = 'Story Script' 
                                        titleDetails = 'Document the interaction' 
                                />
                            </div>
                            <img className='mt-4 xl:mt-0' src={story} alt='story script screenshot' />
                            <SmallText color='text-light-primary dark:text-dark-primary' className='text-center mt-2' text={'Partial story script'} />
                        </aside>
                        <aside className='flex flex-col px-0 lg:px-4  space-y-6 mt-4 xl:mt-0'>
                            <div>
                                <div className='hidden lg:inline-block'>
                                    <CaseStudySectionTitle 
                                            projectTitle = 'Story Script' 
                                            titleDetails = 'Document the interaction'
                                    />
                                </div>
                                <BodyText color='default' className='font-thin mt-2' text={['The story consisted of 3 historical figures - ', <span key='bold-text-fig-1' className='font-bold'>George Washington</span>, ', ', <span key='bold-text-fig-2' className='font-bold'>Martha Washington</span>, ', and ', <span key='bold-text-fig-3' className='font-bold'>James Armistead</span>, ' whom we think best represent the historical value of Washington D.C. ( ', <a href={storyScript} target='_blank' key='link-story' className='text-light-secondary dark:text-dark-secondary underline'>Read full length of our story script</a>,' )']} />
                            </div>
                            <BodyText color='default' className='font-thin' text={'The story built around a secret spy mission referencing an historical event where guests have the chance to collect a unique reward upon finishing the game.'} />
                        </aside>
                    </div>
                    <div className='flex flex-col lg:flex-row items-center'>
                        <aside className='space-x-0 w-full lg:w-60%'>
                            <div className='inline-block lg:hidden'>
                                <SubHeaderText color='default' className='font-bold' text = {'Field Research'} />
                            </div>
                            <img className='mt-4 xl:mt-0' src={floor} alt='hotel floor plan screenshot' />
                            <SmallText color='text-light-primary dark:text-dark-primary' className='text-center mt-2' text={'The lusxrious hotel lobby floor plan'} />
                        </aside>
                        <aside className='flex flex-col px-0 lg:px-4  space-y-2'>
                            <div className='hidden lg:inline-block'>
                                <SubHeaderText color='default' className='font-bold' text = {'Field Research'} />
                            </div>
                            <BodyText color='default' className='font-thin' text={'We also did a field research to get the floor plan of the hotel\'s lobby, which helps us get a better sense of the indoor structure to plan out the proper game path.'} />
                        </aside>
                    </div>
                    <div>
                        <SubHeaderText color='default' className='font-bold' text = {'Interaction Flow Summary'} />
                        <BodyText color='default' className='font-thin mt-2' text={['Our game consists of 11 steps of interactions to achieve the reward ( ', <a href={storyScript} target='_blank' key='link-story-2' className='text-light-secondary dark:text-dark-secondary underline'>details are displayed in the story script</a>,' ), where we designed to cater for different level of interactions based on different guest personas.']} />
                        <div className='space-y-4 mt-4'>
                            <img className='rounded-md' src={flow} alt='screenshot of the partial story script' />
                            <SmallText color='text-light-primary dark:text-dark-primary' className='text-center' text={'Screenshot of the end-to-end game interaction flow'} />
                        </div>
                    </div>
                </section>

                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-20'>
                    <section>
                        <CaseStudySectionTitle 
                            projectTitle = 'Polish the Game Experience' 
                            titleDetails = 'Simulating a real luxrious experience' 
                        />
                        <BodyText color='default' className='mt-1 font-thin' text={'After we finished the interaction flow and initial screen design, we then placed major resources to capture quality frames that can be used in the prototype, including to rent the 18-century style of dressing and recruit professionals to help us film & record voice of the 3 historical figures in our game.'} />
                    </section>
                    <section className='mt-12'>
                        <img className='' src={filmingSet} alt='filming set screenshot' />
                        <SmallText color='text-light-primary dark:text-dark-primary' className='text-center mt-4' text={'Filming setup with the recruited actor/actress on set'} />
                    </section>

                    <section className='flex flex-col xl:flex-row xl:space-x-6 mt-28'>
                        <aside className='order-2 xl:order-1 w-50% xl:w-70% mx-auto'>
                            <img className='' src={finalScreen} alt='sample of the final design screens' />
                            <SmallText color='text-light-primary dark:text-dark-primary' className='text-center mt-4' text={'Sample AR mobile game interfaces'} />
                        </aside>
                        <aside className='flex flex-col order-1 xl:order-2 items-center'>
                            <div className='space-y-6'>
                                <div className='mt-0 xl:mt-4'>
                                    <SubHeaderText color='default' className='font-bold' text = {'Final Solution Samples & Scalability'} />
                                    <BodyText color='default' className='font-thin mt-2' text={'Due to NDA, we can only show partial concept screens here. We were using 8th Wall to build the WebAR experience in mobile interfaces.'} />
                                </div>
                                <BodyText color='default' className='font-thin' text={'Our solution also consider the scalability of the game, planning to have multiple luxrious hotel branches join to build their own AR games and assemble a massive scavenger hunting map.'} />
                                <BodyText color='default' className='font-thin' text={'Once the guests complete the game and collect the unique reward, we aim to prompt their thirst and interest to collect other unique rewards in different luxrious branches in the States.'} />
                            </div>
                            <div className='flex flex-col items-center justify-center mb-20 mt-10 xl:mb-0 xl:mt-10%'>
                                <img className='w-60%' src={reward} alt='screenshot of the reward tokens and the planning scavenger hunting map' />
                                <SmallText color='text-light-primary dark:text-dark-primary' className='text-center mt-4' text={'Sample game reward coin & the future plan of a state-wide scavenger hunt.'} />
                            </div>
                        </aside>
                    </section>

                    <section className='mt-28 space-y-10'>
                        <div>
                            <CaseStudySectionTitle 
                                projectTitle = 'My Contribution' 
                                titleDetails = 'Secure the gateway experience' 
                            />
                            <BodyText color='default' className='mt-1 font-thin' text={'I focused heavily on researching and implementing the proper facial recognition algorithm to fulfill a better gateway experience for the hotel guests. Several questions to answer while testing different facial recognition algorithms including:'} />
                        </div>
                        <ul className='list-disc pl-4 text-light-primary dark:text-dark-primary space-y-3 lg:space-y-2 font-body-text'>
                            <li><span className='font-bold'>Detection threshold:</span> How to tell if the guests are walking by or staring at the portrait in close proximity?</li>
                            <li><span className='font-bold'>Engaging Time:</span> How long of a staring from a guest makes sense to further triggers the next action?</li>
                            <li><span className='font-bold'>Model Accuracy:</span> Can the facial detection algorithm remain a stable accuracy while more faces show up?</li>
                        </ul>
                        <BodyText color='default' className='mt-1 font-thin' text={['To optimize the experience, we contantly tested our solution and went through multiple iterations to ensure a bug-free prototype while demonstrating to the client.']} />
                        <div>
                            <img className='' src={cv} alt='photos of how I design and test the facial recognition kiosk' />
                            <SmallText color='text-light-primary dark:text-dark-primary' className='text-center mt-4' text={'Photos of me and my other partner working on the facial recognition kiosk development and testing'} />
                        </div>
                    </section>
                </section>

                <section className='case-study-w-bg-section bg-light-tertiary-elevation dark:bg-dark-tertiary-elevation animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-20 space-y-10'>
                    <CaseStudySectionText className=''
                        projectTitle = 'Takeaway' 
                        titleDetails = 'Lessons I learned' 
                        text = {'In this project, I realized that UX is just a problem-solving process, even though I did not contribute to the AR UI Design in this project, my participation in the ideation, research, and even the facial recognition development all have huge impact to the user experience of our product.'}
                    />
                    <BodyText color='default' className='font-light' text={'While we did not get an immediate buy-in from the client, it is still a valueable experience. I learned greatly about how to look for resources and reading technical documentations to solve problems that I am not familiar with, and have successfully built a technical proof of concept to demonstrate to the client.'} / >

                </section>

                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-20 space-y-4'>
                    <div className='inline-block mx-auto mb-3 xl:mx-0'>
                        <CaseStudySectionTitle 
                            projectTitle = 'Read Other Case Studies >' 
                            titleDetails = 'Navigate to other design projects' 
                        />
                    </div>
                    <ul className='flex flex-col xl:flex-row justify-between space-y-6 xl:space-y-0'>
                        <li>
                            <Link onClick={this.toTop} to={'/uiux-project/toshiba'} className=''><BodyText color='default' className='text-center underline underline-offset-8 hover:text-light-secondary dark:hover:text-dark-secondary' text={'1. Optimize the Checkout Experience'} /></Link>
                        </li>
                        <li>
                            <Link onClick={this.toTop} to={'/uiux-project/chatbot'} className=''><BodyText color='default' className='text-center underline underline-offset-8 hover:text-light-secondary dark:hover:text-dark-secondary' text={'2. Educational Design Teaching UX'} /></Link>
                        </li>
                        <li>
                            <Link onClick={this.toTop} to={'/uiux-project/info-design'} className=''><BodyText color='default' className='text-center underline underline-offset-8 hover:text-light-secondary dark:hover:text-dark-secondary' text={'3. Information-driven Storytelling'} /></Link>
                        </li>
                    </ul>
                </section>
            </>
        );
    }
}

export default ARProject;