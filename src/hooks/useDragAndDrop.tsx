import { useCallback } from 'react';
import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy, rectSortingStrategy, rectSwappingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { getDataId, swapPositions } from '../utils';
import { Data } from '../types/Data';

type UseDragAndDropProps = {
    data: Data[] | null;
    updateData: React.Dispatch<React.SetStateAction<Data[] | null>>;
};

export const useDragAndDrop = ({ data, updateData }: UseDragAndDropProps) => {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 1,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 1,
            },
        })
    );

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        
        const { active, over } = event;
        if (active?.id === over?.id) return;

        updateData((data) => {
            if (!data) return null;
            const original = getDataId(active?.id, data);
            const newPosition = getDataId(over?.id, data);
            const newArray = arrayMove(data, original, newPosition);
            return newArray;
        });
    }, [updateData]);

    return {
        DndContextComponent: ({ children }: { children: React.ReactNode }) => (
            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                {children}
            </DndContext>
        ),
        SortableContextComponent: ({ children }: { children: React.ReactNode }) => (
            <SortableContext items={data || []}>
                {children}
            </SortableContext>
        )
    };
};
