import React from 'react'

class ProjectTag extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className='flex space-x-1.5'>
                {
                    this.props.tags.map((tagText, index)=>{
                        return <span key={index} className={'tag border dark:text-dark-primary dark:border-dark-primary px-2 py-1 sm:px-3 sm:py-0.5 rounded-sm text-center text-xs sm:text-sm flex items-center'+' '+this.props.className}>{tagText}</span>
                    })
                }
            </div>
        )
    }
}

export default ProjectTag;