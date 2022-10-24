import React from 'react';
import {Link} from 'react-router-dom';

class NavLink extends React.Component{
    constructor(props){
        super(props);
        this.toTop = this.toTop.bind(this);
    }

    toTop = () => {
        window.scrollTo(0,0);
    }


    render(){
        if(this.props.page===''||this.props.page==='work'){
            return(
                <Link onClick={this.toTop} className={'nav-link border-b border-transparent tracking-wider font-body-text text-sm text-light-primary dark:text-dark-primary hover:border-light-primary dark:hover:border-dark-primary duration-300'+' '+this.props.className} to='/'>
                    {this.props.page.toUpperCase()}
                </Link>
            );
        }else{
            return(
                <Link onClick={this.toTop} className={'nav-link border-b border-transparent tracking-wider font-body-text text-sm text-light-primary dark:text-dark-primary hover:border-light-primary dark:hover:border-dark-primary duration-300'+' '+this.props.className} to={'/'+this.props.page}>
                    {this.props.page.toUpperCase()}
                </Link>
            );
        }
    }
}

export default NavLink;