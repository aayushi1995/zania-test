import { Data } from "../types/Data"

export const swapPositions = (data: any, original: number, newPosition: number) => {
    if (original === newPosition) return data
    const temp = data[original].position
    data[original].position = data[newPosition].position
    data[newPosition].position = temp
    return data
}

export const getDataId = (id: string, data: Data[]) => data?.findIndex((item) => item.id === id);
