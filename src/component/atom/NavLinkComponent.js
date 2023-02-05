import React from 'react';
import {NavLink} from 'react-router-dom';

class NavLinkComponent extends React.Component{
    constructor(props){
        super(props);
        this.toTop = this.toTop.bind(this);
    }

    toTop = () => {
        window.scrollTo(0,0);
    }


    render(){
        return(
            <NavLink 

            to={`/${this.props.page===''||this.props.page==='work'?'':this.props.page}`}
            className = {(navData) => navData.isActive ? `nav-link border-b tracking-wider font-body-text text-sm text-light-secondary dark:text-dark-secondary hover:border-light-secondary dark:hover:border-dark-secondary duration-300 transition-all ease-in ${this.props.className}` : `nav-link border-b border-transparent tracking-wider font-body-text text-sm text-light-primary dark:text-dark-primary hover:border-light-primary dark:hover:border-dark-primary duration-300 transition-all ease-in ${this.props.className}`}
            id={this.props.id} onClick={this.toTop}
            end
            >
                
                {this.props.page.toUpperCase()}

            </NavLink>
        )
    }
}

export default NavLinkComponent;