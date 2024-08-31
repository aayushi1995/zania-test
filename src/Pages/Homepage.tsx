import { useCallback, useEffect, useRef, useState } from 'react'
import Card from '../components/Card'
import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, horizontalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { getDataId, swapPositions } from '../utils'
import { Data } from '../types/Data'




const HomePage = () => {
    
    const [data, setData] = useState<Data[] | null>(null)

    const dataRef = useRef<Data[] | null>(null);
    useEffect(() => {
        dataRef.current = data;
      }, [data]);


    const handleDragEnd = (event: DragEndEvent ) => {
        const {active, over} = event
        if(active?.id === over?.id) return 
     
            setData((data) => {
            const original = getDataId(active?.id, data)
            const newPosition = getDataId(over?.id, data)
            const newArray = data !== null && arrayMove(data, original, newPosition)
            const swapedArray = swapPositions(newArray, original, newPosition)
            return swapedArray
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

    const getData = useCallback(async () => {
        try {
          const response = await fetch('/getdata');
          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }
          const result = await response.json();
          setData(result.data);

          console.log('Fetched successful:', result.data, response.status);
          
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      }, []);

    const updatePositions = useCallback(async () => {
        if (!dataRef.current) return;
        try {
          const request = new Request('/updatepositions', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataRef.current),
          });
    
          const response = await fetch(request);
          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }
          console.log('Update successful:', response.status);
        } catch (error) {
          console.error('Failed to update data:', error);
        }
      }, []);
    
    useEffect(() => {
        getData()
        const interval = setInterval(() => {
            updatePositions()
        },5000)
        return () => clearInterval(interval)
    },[])

    return (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className='grid grid-cols-3 gap-3'>
            {data ? <SortableContext items={data} strategy={horizontalListSortingStrategy}>
            {data !== null && data?.map(({id, ...props}) => (
               <Card {...props} id={id} key={id}/>
            ))}
            </SortableContext>
            : 'loading'}
        </div>
        </DndContext>
    )
}

export default HomePage

// 1. Create a customHook that does all the API calls.
// 2. Modify the custom hook, and compare it with the current data and optimise the current calculation.
// 3. Add a loading state.
// 4. Add an Error boundary.
// 5. Add loader in images .
// 6. Make it responsive.