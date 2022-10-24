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
import chatbotHomeImg from '../../../asset/chatbot/home-img.png';
import ideation from '../../../asset/chatbot/ideation.png';
import storyScript from '../../../asset/chatbot/story-script.png';
import gameFlow from '../../../asset/chatbot/game-flow.svg';
import storyboard1 from '../../../asset/chatbot/storyboard-1.svg';
import storyboard2 from '../../../asset/chatbot/storyboard-2.svg';
import storyboard3 from '../../../asset/chatbot/storyboard-3.svg';
import designAsset from '../../../asset/chatbot/design-asset.svg';
import demo from '../../../asset/chatbot/chatbot-demo.mp4';

class Chatbot extends React.Component {
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
                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col lg:flex-row justify-center px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-10 mt-24 sm:mt-28 xl:mt-36 2xl:mt-10%'>
                    <aside className='w-auto space-x-0'>
                        <div className='inline-block lg:hidden mb-2'>
                            <SmallText color='default' text={'2022 - UNC BSI Lab - Client Sponsored Project'} />
                            <HeaderText color='default' className='font-bold' text={'Educational Design Teaching UX'} />
                        </div>
                        <img className='bg-light-tertiary-elevation rounded-md' src={chatbotHomeImg} alt='chatbot project cover image' />
                    </aside>
                    <CaseStudyOverview bulletPoint={[
                        {title:'Role', text:'Designer'},
                        {title:'Time', text:'6 Weeks'},
                        {title:'Responsibility', text:'Research, UI & Visual Design'},
                        {title:'Tools', text:'Adobe XD, Adobe Illustrator'},
                        {title:'Overview', text:'Design an engaging learning experience for a Fortune 500 hotel brand\'s staff to easily grasp the concept of Human-Centered Design and apply to their daily routine in hotel business.'},
                    ]} className='space-y-5' projectTitle = 'Educational Design Teaching UX' titleDetails = '2022 - UNC BSI Lab - Client Sponsored Project' />
                </section>

                <section className='case-study-w-bg-section bg-light-tertiary-elevation dark:bg-dark-tertiary-elevation animate__delay-body animate__animated animate__fadeIn flex flex-col lg:flex-row justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-10 mt-10'>
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
                            text = 'Take a look at our final solution. The video demonstrates the user flow of our educational game, shot by the story team members with quality editing production.'
                        />
                        <CaseStudySectionText className=''
                            projectTitle = 'The Impact' 
                            titleDetails = 'Final Result' 
                            text = 'We presented the solution to the client and got a successful buy-in. As a next step, they are planning to make different version of the game that caters for other branches.'
                        />
                    </aside>
                </section>

                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-10 space-y-16'>
                    <CaseStudySectionText className=''
                            projectTitle = 'The Context' 
                            titleDetails = 'How it begins' 
                            text = 'Joing UNC Reese Innovation Lab, now rebranded as Blue Sky Innovations (BSI), we were been tasked with building a solution to teach the hotel staff Human-Centered Design (HCD) in an engaging way, so as to help the hotel involve HCD in its business and improve the customer experience.'
                    />
                    <CaseStudySectionText className=''
                            projectTitle = 'The Contraints' 
                            titleDetails = 'Project Scope' 
                            text = 'The main constraint is time, as the client has a busy schedule, the set final presentation date is fixed and gave us limited time to finish the proof of concept, which challenged our prioritization on the resource allocation.'
                    />
                </section>

                <section className='case-study-w-bg-section bg-light-tertiary-elevation dark:bg-dark-tertiary-elevation animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-10 space-y-16'>
                    <aside>
                        <CaseStudySectionTitle 
                                projectTitle = 'Define the Problems' 
                                titleDetails = 'Set up the design objective' 
                        />
                        <BodyText color='default' className='mt-1 font-thin' text='Like all good HCD processes, we started by defining our design question:' />
                        <SubHeaderText color='text-light-secondary dark:text-dark-secondary' className='mt-5 font-bold underline italic' text='How might we teach human-centered design to hotel staff in an engaging way?' />
                    </aside>
                    <aside>
                        <CaseStudySectionTitle 
                                projectTitle = 'Research Insights' 
                                titleDetails = 'Analyzing the problems' 
                        />
                        <BodyText color='default' className='mt-1 font-thin' text='With the initial research conducted and the information provided by the client, we realized that:' />
                        <ul className='mt-6 list-disc pl-4 text-light-primary dark:text-dark-primary space-y-3 lg:mt-2 lg:space-y-0 font-body-text'>
                            <li>Hotel staff may not be able to fully understand the jargons and lecturing that surrounds design thinking.</li>
                            <li>The method works best in any form of learning always involves a fun and interactive process. </li>
                        </ul>
                    </aside>
                </section>

                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-10 space-y-16'>
                    <div className='flex flex-col xl:flex-row items-center'>
                        <aside className='space-x-0 w-full'>
                            <div className='inline-block lg:hidden'>
                                <CaseStudySectionTitle 
                                        projectTitle = 'Ideation Process' 
                                        titleDetails = 'Brainstorming possible solutions' 
                                />
                            </div>
                            <img className='rounded-md' src={ideation} alt='ideation whiteboard photo' />
                        </aside>
                        <aside className='flex flex-col px-0 lg:px-4  space-y-6'>
                            <div className='hidden lg:inline-block'>
                                <CaseStudySectionTitle 
                                        projectTitle = 'Ideation Process' 
                                        titleDetails = 'Brainstorming possible solutions' 
                                />
                            </div>
                            <BodyText color='default' className='font-thin' text={['Following the research results, our ideas centering around an educational design that pairs well with the lab\'s strength: ', <span key='bold-tex-lab-strength' className='font-bold'>emerging technology gamification.</span>]} />
                            <BodyText color='default' className='font-thin' text={'Localization is also critial to bond connection & deepen the memory. With this in mind, we decided to build a game for hotel staff to learn HCD by interacting with the local business in town.'} />

                        </aside>
                    </div>
                    <div>
                        <BodyText color='default' className='font-bold' text = {'First Iteration'} />
                        <ul className='list-disc pl-4 text-light-primary dark:text-dark-primary'>
                            <li>Augmented Reality (AR) Scavenger Hunt</li>
                        </ul>
                        <BodyText color='default' className='mt-2 font-thin' text={['The first idea is to build an AR scavenger hunt as the lab has a track record of building a similar product in the past, but we realized ', <span key='bold-text' className='font-bold text-light-secondary dark:text-dark-secondary'>3 flaws</span>, ' of adopting AR that would potentially damage the experience of our game.']} />
                        <div className='flex flex-col lg:flex-row justify-between mt-6 space-y-4 lg:space-y-0'>
                            <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-30% text-center py-4'>
                                <SubHeaderText color='default' className='font-bold' text={['Bad for teaching', <br key='line-brk' /> ,'intangible topics']} />
                            </span>
                            <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-30% text-center py-4'>
                                <SubHeaderText color='default' className='font-bold' text={['Does not allow', <br key='line-brk' /> ,'mobility']} />
                            </span>
                            <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-30% text-center py-4'>
                                <SubHeaderText color='default' className='font-bold' text={['Limited user', <br key='line-brk' /> ,'Interactions']} />
                            </span>
                        </div>
                    </div>
                    <div>
                        <BodyText color='default' className='font-bold' text = {'Second Iteration'} />
                        <ul className='list-disc pl-4 text-light-primary dark:text-dark-primary'>
                            <li>Chatbot Scavenger Hunt</li>
                        </ul>
                        <BodyText color='default' className='mt-2 font-thin' text={['Upon discussing multiple ideas, we concluded ', <span key='bold-text' className='font-bold text-light-secondary dark:text-dark-secondary'>3 advantages</span>, ' that chatbot is a better alternative to envision our solution.']} />
                        <div className='flex flex-col lg:flex-row justify-between mt-6 space-y-4 lg:space-y-0'>
                            <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-30% text-center py-4'>
                                <SubHeaderText color='default' className='font-bold' text={['Pass data such as', <br key='line-brk' /> ,'image / text easily']} />
                            </span>
                            <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-30% text-center py-4'>
                                <SubHeaderText color='default' className='font-bold' text={['Personalized', <br key='line-brk' /> ,'Interaction']} />
                            </span>
                            <span className='border border-light-primary dark:border-dark-primary rounded-md w-full lg:w-30% text-center py-4'>
                                <SubHeaderText color='default' className='font-bold' text={['Ability to guide', <br key='line-brk' /> ,'through the process']} />
                            </span>
                        </div>
                    </div>
                </section>

                <section className='case-study-w-bg-section bg-light-tertiary-elevation dark:bg-dark-tertiary-elevation animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-10 space-y-10'>
                    <CaseStudySectionText className=''
                            projectTitle = 'Story Script' 
                            titleDetails = 'Document the Interactions' 
                            text = {['We built 3 storylines to ensure a flexible game experience. Throughout the process, the hotel staff will be presented with challenges to learn the HCD concepts via 3 forms of interaction - ', <span className='font-bold' key='bold-font-1'>Observation</span>,', ', <span className='font-bold' key='bold-font-2'>Ask</span>, ', and ', <span className='font-bold' key='bold-font-3'>Reflection</span>]}
                    />
                    <div className='space-y-4'>
                        <img className='rounded-md' src={storyScript} alt='screenshot of the partial story script' />
                        <SmallText color='text-light-primary dark:text-dark-primary' className='text-center' text={'Screenshot of the partial story script'} />
                    </div>
                    <div>
                        <BodyText color='default' className='font-bold' text={'Why the challenges are relevant?'} />
                        <ul className='mt-2 list-disc pl-4 text-light-primary dark:text-dark-primary space-y-3 lg:space-y-2 font-body-text'>
                            <li className='underline'><span className='font-bold'>Observation:</span> The interaction helps form assumptions based on what we see.</li>
                            <ul className='mt-2 text-light-primary dark:text-dark-primary space-y-3 lg:space-y-0 font-light'>
                                <li>Player will learn the UX research method - <span className='font-normal text-light-secondary dark:text-dark-secondary'>Fly On the Wall</span>, in this task.</li>    
                            </ul>
                            <li className='underline'><span className='font-bold'>Ask:</span> Interview validates or challenges our assumptions by gaining information from end-users.</li>
                            <ul className='mt-2 text-light-primary dark:text-dark-primary space-y-3 lg:space-y-0 font-light'>
                                <li>Player will practice their user interview skill in this task.</li>    
                            </ul>
                            <li className='underline'><span className='font-bold'>Reflection:</span> Summarizing the information and adjust our initial assumptions.</li>
                            <ul className='mt-2 text-light-primary dark:text-dark-primary space-y-3 lg:space-y-0 font-light'>
                                <li>Player will learn how to synthesize the information and uncover the research insights.</li>    
                            </ul>
                        </ul>
                    </div>
                    <div>
                        <BodyText color='default' className='font-bold' text = {'Flow Summary'} />
                        <img className='w-full md:w-90% lg:w-80% bg-light-tertiary-elevation bg-opacity-60 rounded-md mt-2' src={gameFlow} alt='summary of the game flow' />
                    </div>
                    <div>
                        <CaseStudySectionTitle 
                            projectTitle = 'Storyboard' 
                            titleDetails = 'Visualize the Interactions' 
                        />
                        <div className='space-y-1 mt-2 mb-4'>
                            <img className='rounded-md' src={storyboard1} alt='First 3 frames of the storyboard' />
                            <SmallText color='text-light-primary dark:text-dark-primary' className='' text={'1. With the chatbot persona introduces the story context, the player sets on a scavenger hunt in downtown Chapel Hill.'} />
                        </div>
                        <div className='space-y-1 mb-4'>
                            <img className='rounded-md' src={storyboard2} alt='Middle 3 frames of the storyboard' />
                            <SmallText color='text-light-primary dark:text-dark-primary' className='' text={'2. Player arrives at the local business based on the game clue/hint, chatbot then presents a series of 3 tasks'} />
                        </div>
                        <div className='space-y-1'>
                            <img className='rounded-md' src={storyboard3} alt='Final 3 frames of the storyboard' />
                            <SmallText color='text-light-primary dark:text-dark-primary' className='' text={'3. Player complete the tasks that practices HCD concepts while taking notes to enhance the learning process.'} />
                        </div>
                    </div>
                </section>

                <section className='animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-10 space-y-10'>
                    <CaseStudySectionText className=''
                            projectTitle = 'Polish the solution' 
                            titleDetails = 'Design Support' 
                            text = {['Collaborated with story team and development team, we provided visual design that aligns with ', <span key='bold-text-my-work1' className='font-medium underline'>(1) The persona/story script info</span>, ', and ', <span key='bold-text-my-work2' className='font-medium underline'>(2) The chatbot interface sizes.</span>]}
                    />
                    <div>
                        <BodyText color='default' className='font-light' text={['Some details about the design style - We implemented the ', <span key='bold-text-design-style1' className='font-medium underline'>Alegria Illustration Style for graphic design</span>, ' & use ', <span key='bold-text-design-style2' className='font-medium underline'>Montserrat</span> ,' as the main font type. I support the design assets for 1 storyline (See my design below), including:']} / >
                        <ul className='mt-6 list-disc pl-4 text-light-primary dark:text-dark-primary space-y-3 lg:mt-6 lg:space-y-2 font-body-text'>
                            <li><span className='font-medium'>1</span> Illustration design of the chatbot persona - <span className='font-medium underline'>Sandra Rogers</span>.</li>
                            <li><span className='font-medium'>1</span> Illustration design of <span className='font-medium underline'>Sandra’s</span> social media cover.</li>
                            <li><span className='font-medium'>1</span> Infographic template of the task - <span className='font-medium underline'>Ask</span> for all storylines.</li>
                            <li><span className='font-medium'>3</span> Illustration posters for the local business in the storyline</li>
                        </ul>
                        <img className='mt-6 bg-light-tertiary-elevation rounded-md' src={designAsset} alt='Final 3 frames of the storyboard' />
                    </div>
                </section>
                
                <section className='case-study-w-bg-section bg-light-tertiary-elevation dark:bg-dark-tertiary-elevation animate__delay-body animate__animated animate__fadeIn flex flex-col justify-between px-5% md:px-10% xl:px-15% laptop-md:px-18% laptop-lg:px-30% py-10 space-y-10'>
                    <CaseStudySectionText className=''
                        projectTitle = 'Takeaway' 
                        titleDetails = 'Lessons I learned' 
                        text = 'This project helps me learn how to better collaborate cross-functionally with students from different backgrounds ( The team consists of people came from Engineering, Education, Journalism, and Information Science disciplines ), participate in the design thinking process, and translate research data into the final solution.'
                    />
                    <BodyText color='default' className='font-light' text={['Of all the lessens, the biggest takeaway for me is the importance of ', <span key='bold-text-design-style1' className='font-medium underline'>storytelling</span>, '. At the end, it\'s all about whether we can get buy-in from the stakeholders, it is a technique that is applicable to all fields and is something I still need to work on a lot!']} / >

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
                            <Link onClick={this.toTop} to={'/uiux-project/ar-game'} className=''><SubHeaderText color='default' className='font-thin text-center underline underline-offset-8 hover:text-light-secondary dark:hover:text-dark-secondary' text={'2. Design a Luxrious Experience'} /></Link>
                        </li>
                        <li>
                            <Link onClick={this.toTop} to={'/uiux-project/info-design'} className=''><SubHeaderText color='default' className='font-thin text-center underline underline-offset-8 hover:text-light-secondary dark:hover:text-dark-secondary' text={'3. Information-driven Storytelling'} /></Link>
                        </li>
                    </ul>
                </section>

            </>
        )
    }
}

export default Chatbot;