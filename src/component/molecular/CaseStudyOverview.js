import React from 'react';
// import CaseStudySectionTitle from './CaseStudySectionTitle';
import HeaderText from '../atom/HeaderText';
import SmallText from '../atom/SmallText';
import BodyText from '../atom/BodyText';

class CaseStudyOverview extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <aside className={'flex flex-col justify-center px-0 lg:px-5 ' + this.props.className}>
                <div className='hidden lg:inline-block'>
                    <SmallText color='default' text={this.props.titleDetails} />
                    <HeaderText color='default' className='font-bold' text={this.props.projectTitle} />
                </div>
                {
                    this.props.bulletPoint.map((info, index)=>{
                        // If passing key in a predefined component (make sure to include 2 keys, 1 for current component, 1 for the tags inside the component)
                        return  (
                            <BodyText color='default' className='' key={index} keyId={index} text = {[<b key={index}>{info.title}</b>,': ',<span key={index+10} className='font-thin'>{info.text}</span>]} />
                        )
                    })
                }
            </aside>
        );
    }
}

export default CaseStudyOverview;