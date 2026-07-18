

export const userKeys = {
    all: ['users'],
    lists: () => [...userKeys.all, 'lists'],
    details: (id) => [...userKeys.all, 'details', id]
}