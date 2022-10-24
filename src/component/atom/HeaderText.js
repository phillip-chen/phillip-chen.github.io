import React from 'react';

class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let fontColor = '';
        this.props.color === 'default'? fontColor = 'text-light-primary dark:text-dark-primary' : fontColor = this.props.color;

        return(
            <h1 className = {"text-2xl sm:text-3xl 2xl:text-4xl font-title" + " " + fontColor + " " + this.props.className}>
                {this.props.text}
            </h1>
        )
    }
}

export default Header;