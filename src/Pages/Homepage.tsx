import { useState } from 'react'
import Card from '../Components/Card'
import jsonData from '../assets/data.json'
import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, horizontalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable'


const HomePage = () => {
    
    const [data, setData] = useState(jsonData)


    const getDataId = (id:string) => data?.findIndex(item => item.id === id)

    const handleDragEnd = (event: DragEndEvent ) => {
        const {active, over} = event
        if(active?.id === over?.id) return 
        setData((data) => {
            const original = getDataId(active?.id)
            const newPosition = getDataId(over?.id)
            console.log(active, over)
            return arrayMove(data, original, newPosition)
        })
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 1
              },
        }),
        useSensor(KeyboardSensor,{
            coordinateGetter: sortableKeyboardCoordinates
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 1
              },
        })
    )   

    return (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className='grid grid-cols-3 gap-3'>
            <SortableContext  items={data} strategy={horizontalListSortingStrategy}>
            {data?.map(({id, ...props}) => (
               <Card {...props} id={id} key={id}/>
            ))}
            </SortableContext>
        </div>
        </DndContext>
    )
}

export default HomePage


