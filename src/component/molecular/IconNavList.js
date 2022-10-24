import React from 'react';
import IconLink from '../atom/IconLink';

class IconNavList extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className={'flex flex-row items-center space-x-4 sm:space-x-5'+' '+this.props.className}>
                <IconLink iconType = {"github"} size = {"w-6 h-6 sm:w-7 sm:h-7"} />
                <IconLink iconType = {"linkedin"} size = {"w-6 h-6 sm:w-7 sm:h-7"} />
                <IconLink iconType = {"email"} size = {"w-7 h-7 sm:w-8 sm:h-8"} />
            </div>
        );
    }
}

export default IconNavList