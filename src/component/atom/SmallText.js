import React from 'react';

class SmallText extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let fontColor = '';
        this.props.color === 'default'? fontColor = 'text-light-secondary dark:text-dark-secondary' : fontColor = this.props.color;
        
        return(
            <p className= {"font-body-text text-xs sm:text-sm leading-relaxed" + " " + fontColor + " " + this.props.className}>
                {this.props.text}
            </p>
        )
    }
}

export default  SmallText;