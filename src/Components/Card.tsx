import { useSortable } from '@dnd-kit/sortable'
import {CSS } from '@dnd-kit/utilities'
import React, { useEffect } from 'react'
import { Data } from '../types/Data'

const Card: React.FC<Data> = ({id, title, imgUrl, position}) => {

    const [showFullScreen, setShowFullScreen] = React.useState<boolean>(false)
    const {setNodeRef, attributes, listeners, transform, transition}  =  useSortable({id})

    const handleCardClick = () => {
        setShowFullScreen(true)
    }

    // Hide fullscreen image on escape
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowFullScreen(false)
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
      }, []);

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <>
            <div ref={setNodeRef} onClick={handleCardClick} {...attributes} {...listeners} style={style} className='shadow-lg p-2 cursor-pointer touch-none' tabIndex={0} >
                <div>{title} {position}</div>
                <img src={imgUrl}/>
                
            </div>
            {showFullScreen && <div className='h-screen w-screen fixed top-0 left-0' tabIndex={0}><img src={imgUrl}/></div>}
        </>
       

    )
}

export default Card