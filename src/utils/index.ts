import {  DataType } from "../types/Data"

export const swapPositions = (data: any, original: number, newPosition: number) => {
    if (original === newPosition) return data
    const temp = data[original].position
    data[original].position = data[newPosition].position
    data[newPosition].position = temp
    return data
}

export const getDataId = (id: string, data: DataType[]) => data?.findIndex((item) => item.id === id);

export const getChangedPositions = (currentData: DataType[], lastDataState: DataType[] ) => {

    let movedElements: any = []
    
    lastDataState?.forEach((element: DataType) => {
        const currentObj = currentData?.find((item) => item.id === element.id);

        if(currentObj && currentObj?.position !== element.position){
            movedElements.push({
                id: element.id,
                position: currentObj.position
            })
        }
    })

    return movedElements
}


export const convertArrayToObject = (data: DataType[]) => {
    const keyValuePairs: Record<number, DataType> = {};
    data.forEach((obj: DataType) => {
        keyValuePairs[obj.position] = obj
    });
    return keyValuePairs

}

// define proper types, there is some type issue here happening because of the type coersion
export const updatePositionsToObject = (positions: any, data: Record<number, DataType> ) => {

    let newObj = JSON.parse(JSON.stringify(data))

    // handle type issues
    let newArray = Object.values(newObj) as DataType[]

    positions?.forEach((element: any ) => {
        
        let tempObj = newArray?.find((item) => item.id === element.id)
        newObj[element.position] = tempObj
    })
    return newObj
}

export const rearrangePositions = (data: DataType[]) => {
    if (!data) return null
    let result = []
    for(let i =0; i < data.length; i++){
        result.push({...data[i], position: i})
    }
    return result
}
