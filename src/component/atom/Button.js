import React from 'react';
import {Link} from 'react-router-dom';

class Button extends React.Component{
    constructor(props){
        super(props);
        this.toTop = this.toTop.bind(this);
    }

    toTop = () => {
        window.scrollTo(0,0);
    }

    render(){
        return(
            <Link onClick={this.toTop} to={'/'+this.props.projectType+'/'+this.props.projectName} className={this.props.btnType + " " + "text-center font-body-text text-light-tertiary dark:text-dark-tertiary bg-dark-tertiary hover:bg-dark-tertiary-elevation dark:bg-light-tertiary dark:hover:bg-light-tertiary-elevation rounded-sm px-4 py-1.5 mx-auto inline-block"}>
                {this.props.btnText}
            </Link>
        );
    }
}

export default Button;