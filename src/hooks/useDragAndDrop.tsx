import { useCallback } from 'react';
import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSwappingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { getDataId, rearrangePositions } from '../utils';
import { DataType } from '../types/Data';

type UseDragAndDropProps = {
    data: DataType[] | null;
    updateData: React.Dispatch<React.SetStateAction<DataType[] | null>>;
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
            // TODO: handle type issues
            const original = getDataId(active?.id, data);
            const newPosition = getDataId(over?.id, data);
            const newArray = arrayMove(data, original, newPosition);
            const rearrangedArray = rearrangePositions(newArray)
            return rearrangedArray;
        });
    }, [updateData]);

    return {
        DndContextComponent: ({ children }: { children: React.ReactNode }) => (
            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                {children}
            </DndContext>
        ),
        SortableContextComponent: ({ children }: { children: React.ReactNode }) => (
            <SortableContext items={data || []} strategy={rectSwappingStrategy}>
                {children}
            </SortableContext>
        )
    };
};
