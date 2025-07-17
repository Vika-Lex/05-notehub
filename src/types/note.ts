export interface Note {
    id: number
    title: string
    content: string
    createdAt: string
    updatedAt: string
    tag: string
}

export enum Sorting {
    CREATED = 'created',
    UPDATED = 'updated',
}