import React from 'react'

class Dropdown extends React.Component{
    constructor(props){
        super(props)
        this.filter = this.filter.bind(this);
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

    render(){
        return(
            <div className="filter-container w-40 relative font-body-text">
                <select onChange={this.filter} id='filter' className="cursor-pointer w-full px-2.5 py-1 text-light-primary dark:text-dark-primary bg-transparent border rounded-sm shadow-sm outline-none text-base appearance-none">
                    <option value={'uiux-project'}>UI/UX Design</option>
                    <option value={'dev-project'}>UI Development</option>
                </select>
                <span className='absolute filter-arrow inline-block w-4 h-2 bg-light-primary dark:bg-dark-primary right-2'></span>
            </div>
        )
    }
}

export default Dropdown