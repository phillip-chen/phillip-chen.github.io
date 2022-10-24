import React from 'react';

class ToTopBtn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hidden: true
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleScroll = () => {
        if(window.pageYOffset>0){
            this.setState({
                hidden: false
            });
        }else{
            this.setState({
                hidden: true
            });
        }
    }

    handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }


    render(){
        if(!this.state.hidden) {
            return(
                <button onClick={this.handleClick} className={'animate__animated animate__fadeIn section-jumper-link flex flex-row items-center mb-0 lg:bottom-20 w-full bg-light-primary dark:bg-dark-primary lg:dark:bg-transparent rounded-t-sm text-light-tertiary dark:text-dark-tertiary lg:text-light-primary lg:dark:text-dark-primary bg-opacity-80 dark:bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-opacity-100 justify-center py-2 lg:py-0' + ' ' + this.props.className}>
                    <span className='section-jumper-arrow rotate-180 w-3 h-3 mb-1 mr-2 bg-dark-primary dark:bg-light-primary lg:dark:bg-dark-primary lg:bg-light-primary'></span>
                    {this.props.text}
                </button>
            );
        }
    }
}

export default ToTopBtn;