import React from 'react';
import CaseStudySectionTitle from './CaseStudySectionTitle';
import BodyText from '../atom/BodyText';

class CaseStudySectionText extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className={this.props.className + 'space-y-2'}>
                <div className={this.props.titleDisplay}>
                    <CaseStudySectionTitle className={this.props.className} projectTitle = {this.props.projectTitle} titleDetails = {this.props.titleDetails}  />
                </div>
                <BodyText color='default' className='mt-1 font-thin' text={this.props.text} />
            </div>
        );
    }
}

export default CaseStudySectionText;