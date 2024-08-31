import { Data } from "../types/Data"

export const swapPositions = (newArray: any, original: number, newPosition: number) => {
    const temp = newArray[original].position
    newArray[original].position = newArray[newPosition].position
    newArray[newPosition].position = temp
    return newArray
}

export const getDataId = (id: string, data: Data[]) => data?.findIndex((item) => item.id === id);
