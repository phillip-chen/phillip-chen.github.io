import React from 'react';

class BodyText extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let fontColor = '';
        this.props.color === 'default'? fontColor = 'text-light-primary dark:text-dark-primary' : fontColor = this.props.color;

        return(
            <p key={this.props.keyId} className= {"font-body-text text-sm md:text-base 2xl:text-lg leading-relaxed" + " " + fontColor + " " + this.props.className}>
                {this.props.text}
            </p>
        )
    }
}

export default  BodyText;