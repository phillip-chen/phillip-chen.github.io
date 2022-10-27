import React from 'react';
import ProjectTag from '../atom/ProjectTag';
import SubHeader from '../atom/SubHeaderText';
import SmallText from '../atom/SmallText';
import Button from '../atom/Button';
// import all project's home photos
import toshiba from '../../asset/toshiba/home-img.png';
import chatbot from '../../asset/chatbot/home-img.png';
import arGame from '../../asset/ar-game/home-img.png';
import infoDesign from '../../asset/info-design/home-img.png';
// Dev Project
import cvKioskImg from '../../asset/dev-project/cv-kiosk-home-img.png';
import movieDashImg from '../../asset/dev-project/movie-viz-project.png';
import webDashImg from '../../asset/dev-project/rwd-dashboard-project.png';
import colaWarImg from '../../asset/dev-project/cola-war-project.png';
import {Link} from 'react-router-dom';


const imgArr = {
    'toshiba' : toshiba,
    'chatbot' : chatbot,
    'ar-game' : arGame,
    'info-design' : infoDesign,
    'cv-kiosk' : cvKioskImg,
    'movie-dash' : movieDashImg,
    'web-dash-design' : webDashImg,
    'cola-war' : colaWarImg
}

const sourceCodeURL = {
    'cv-kiosk' : 'https://github.com/phillip-chen/MEJO583-Facial-Recognition-Picture-Frame',
    'movie-dash' : 'https://github.com/phillip-chen/INLS641-Final-Project',
    'web-dash-design' : 'https://github.com/phillip-chen/mejo-487-Project-1',
    'cola-war' : 'https://github.com/phillip-chen/mejo-487-project-2'
}


class ProjectCard extends React.Component{
    constructor(props){
        super(props);
        this.routing = this.routing.bind(this);
    }

    routing = () => {
        window.scrollTo(0,0);
        window.location.hash = `#/${this.props.projectType}/${this.props.projectName}`
    }

    render(){
        if(this.props.projectType === 'uiux-project'){
            return(
                <div onClick={this.routing} className={this.props.className + this.props.projectType + ' cursor-pointer hover:scale-95 border-2 border-transparent dark:hover:border-dark-secondary hover:border-light-secondary hover:transition hover:ease-in hover:duration-150 project-card flex flex-col items-start justify-between bg-light-tertiary-elevation dark:bg-dark-tertiary-elevation rounded-sm w-full lg:w-49% p-4'}>
                    <div className='w-full'>
                        <SmallText color='default' className="mb-0 mt-2" text = {this.props.projectSubTitle} />
                        <SubHeader color='default' className="mb-2 font-bold" text={this.props.projectTitle} />
                    </div>
                    <img src= {imgArr[this.props.projectName]} alt={this.props.projectName + ' photo'} className='w-full h-full rounded-md mx-auto project-img dark:bg-light-tertiary-elevation' />
                    <div className='w-full'>
                        <ProjectTag className='mt-3 mb-6 text-xs sm:text-sm' tags = {this.props.projectTags} />
                        <Button projectType={this.props.projectType} projectName={this.props.projectName} btnType = {'btn w-full filter'} btnText = {'View Details'} />
                    </div>
                </div>
            );
        }else if(this.props.projectType === 'dev-project'){
            return(
                <div className={this.props.className + this.props.projectType + ' project-card flex flex-col xl:flex-row items-start justify-between bg-light-tertiary-elevation dark:bg-dark-tertiary-elevation rounded-sm w-full p-4 laptop-lg:p-10'}>
                    <div className='w-80% laptop-lg:w-60% self-center hidden xl:inline-block'>
                        <img src= {imgArr[this.props.projectName]} alt={this.props.projectName + ' photo'} className='rounded-md mx-auto project-img' />
                    </div>
                    <div className='w-full h-full px-4 flex flex-col justify-around laptop-lg:justify-between'>
                        <div className='w-full'>
                            <SmallText color='default' className="mb-0" text = {this.props.projectSubTitle} />
                            <SubHeader color='default' className="mb-2 font-bold" text={this.props.projectTitle} />
                            <div className='w-full self-center inline-block xl:hidden'>
                                <img src= {imgArr[this.props.projectName]} alt={this.props.projectName + ' photo'} className='rounded-md mx-auto project-img w-full' />
                            </div>
                            <ProjectTag className='mb-4 mt-4 xl:mt-0 text-xs sm:text-sm' tags = {this.props.projectTags} />
                            <SmallText color='text-light-primary dark:text-dark-primary' className='mb-3' text={this.props.projectDetails} />
                        </div>
                        <div className='space-x-0 space-y-4 flex flex-col sm:space-y-0 sm:space-x-2 sm:flex-row'>
                            <a href={sourceCodeURL[this.props.projectName]} target='_blank' className='font-body-text text-xs sm:text-sm leading-relaxed text-center text-light-tertiary dark:text-dark-tertiary bg-dark-tertiary hover:bg-dark-tertiary-elevation dark:bg-light-tertiary dark:hover:bg-light-tertiary-elevation rounded-sm px-4 py-1.5 mx-auto w-full'>View Source Code</a>
                            <a href={process.env.PUBLIC_URL+'/dev-project/'+this.props.projectName} target='_blank' className='font-body-text text-xs sm:text-sm leading-relaxed text-center text-light-tertiary dark:text-dark-tertiary bg-dark-tertiary hover:bg-dark-tertiary-elevation dark:bg-light-tertiary dark:hover:bg-light-tertiary-elevation rounded-sm px-4 py-1.5 mx-auto w-full'>Launch Project</a>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ProjectCard