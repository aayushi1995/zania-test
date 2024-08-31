export type Data = {
    id: string
    type?: string
    title: string
    position: number
    imgUrl: string
}
export type updatedataPayload = Pick<Data, "id" | "position">[];