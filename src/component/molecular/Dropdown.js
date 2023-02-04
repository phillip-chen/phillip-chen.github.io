import React from 'react'
// import BodyText from '../atom/BodyText';


class Dropdown extends React.Component{
    constructor(props){
        super(props);
        this.filter = this.filter.bind(this);
        this.hidePlaceholder = this.hidePlaceholder.bind(this);
    }

    componentDidMount(){
        const dropDown = document.getElementById('filter');
        let selectedVal = dropDown.options[dropDown.selectedIndex].value;
        let cards = document.getElementsByClassName('project-card');

        for(let card of cards){
            if(!card.classList.value.includes(selectedVal)){
                card.classList.add('hidden');
            }
        }
        // Set new render count
        localStorage.setItem('renderCount', 2);

        window.onbeforeunload = (e) => {
            if(window.location.hash === '' || window.location.hash === '#/'){
                localStorage.setItem('hovered', false);
            }
        }
    }
    

    filter(e){
        let selectedVal = e.target.value;
        let cards = document.getElementsByClassName('project-card');

        for(let card of cards){
            // Applied filtering animation functions

            if(card.classList.value.includes(selectedVal)){
                setTimeout(()=>{
                    card.classList.add('animate__fadeInUp');
                    card.classList.remove('animate__fadeOutDown');
                    card.classList.remove('hidden');
                },600);
            }else{
                card.classList.add('animate__fadeOutDown');
                card.classList.remove('animate__fadeInUp');
                setTimeout(()=>{
                    card.classList.add('hidden');
                },600);
            }
        }
    }

    hidePlaceholder = () => {
        let placeHolder = document.getElementById('filter-placeholder');

        if(placeHolder){
            if(!placeHolder.classList.contains('animate__fadeOutUp')){
                placeHolder.classList.remove('animate__fadeIn', 'animate__delay-filter');
                placeHolder.classList.add('animate__fadeOutUp');
                setTimeout(()=>{
                    placeHolder.classList.add('hidden');
                    localStorage.setItem('hovered', true);
                },500)
            }
        }

    }

    render(){
        return(
            <div className="filter-container w-44 xs:w-52 sm:w-60 relative font-body-text">
                {/* <BodyText className='font-bold absolute top-15% filter-text' text='Filter :' /> */}
                {localStorage.getItem('hovered')==='true'?
                    <></>
                    :
                    <div id='filter-placeholder' className={`absolute -left-6 -top-9 flex flex-row text-light-primary dark:text-dark-primary animate__animated ${Number(localStorage.getItem('renderCount'))>1?'':'animate__fadeInUp animate__delay-filter'}`}>
                        <span className='rotate-45 mt-6 font-bold'>&#8618;</span>
                        <p className={`font-bold text-sm xs:text-base sm:text-lg animate__animated ${Number(localStorage.getItem('renderCount'))>1?'':'animate__pulse animate__delay-filter-2 animate__repeat-2 animate__fast'}`}>Filter & View Other Projects</p>
                    </div>
                }
                <select onChange={this.filter} onMouseOver={this.hidePlaceholder} id='filter' className="cursor-pointer w-full px-2.5 py-1 text-light-primary dark:text-dark-primary bg-transparent border rounded-sm shadow-sm outline-none text-base appearance-none">
                    <option id='design-option' value={'uiux-project'}>UI/UX Design</option>
                    <option id='code-option' value={'dev-project'}>UI Development</option>
                </select>
                <span className='absolute filter-arrow inline-block w-4 h-2 bg-light-primary dark:bg-dark-primary right-2'></span>
            </div>
        )
    }
}

export default Dropdown