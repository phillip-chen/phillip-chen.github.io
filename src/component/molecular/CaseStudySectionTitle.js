import React from 'react';
import SubHeaderText from '../atom/SubHeaderText';
import SmallText from '../atom/SmallText';

class CaseStudySectionTitle extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <>
                <SmallText className='' color='default' text={this.props.titleDetails} />
                <SubHeaderText color='default' className='font-bold' text={this.props.projectTitle} />
            </>
        );
    }
}

export default CaseStudySectionTitle;