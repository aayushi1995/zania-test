import { Data } from "../types/Data"

export const swapPositions = (data: any, original: number, newPosition: number) => {
    if (original === newPosition) return data
    const temp = data[original].position
    data[original].position = data[newPosition].position
    data[newPosition].position = temp
    return data
}

export const getDataId = (id: string, data: Data[]) => data?.findIndex((item) => item.id === id);

export const getChangedPositions = (data: Data[]) => {
    if (!data) return null
    let result = []
    for(let i =0; i < data.length; i++){
        if(data[i].position !== i){
            result.push({id: data[i].id, position: i})
        }
    }
    return result
}


export const convertArrayToObject = (data: Data[]) => {
    const keyValuePairs = {};

    data.forEach((obj) => {
        keyValuePairs[obj.id] = obj;
    });
    return keyValuePairs

}