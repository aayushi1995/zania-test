export type DataType = {
    id: string
    title: string
    position: number
    imgUrl: string
    type?: string
}
export type InitialDataState = {
    data: DataType[]
    time: number
}
export type movedElementsType = Pick<DataType, "id" | "position">[];