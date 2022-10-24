import React from 'react';

class SubHeader extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let fontColor = '';
        this.props.color === 'default'? fontColor = 'text-light-primary dark:text-dark-primary' : fontColor = this.props.color;

        return(
            <h2 className = {"text-base sm:text-lg 2xl:text-xl font-body-text" + " " + fontColor + " "+ this.props.className}>
                {this.props.text}
            </h2>
        )
    }
}

export default  SubHeader;