import React from 'react';

class IconLink extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <a className={'icon-link inline-block'+" "+this.props.size} href={
                {
                    "github":'https://github.com/phillip-chen',
                    "linkedin":'https://www.linkedin.com/in/yi-tsung-c-795815b7/',
                    "email":'mailto:yitsung.chen95@gmail.com'
                }[this.props.iconType] 
            } target='_blank'>
                <span className={this.props.iconType + " link bg-light-secondary dark:bg-dark-secondary hover:bg-light-primary dark:hover:bg-dark-primary inline-block w-full h-full transition-500"}>
                </span>
            </a>
        );
    }
}

export default IconLink;