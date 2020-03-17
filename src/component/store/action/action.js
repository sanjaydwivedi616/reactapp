
export const AddUser = data => {
    return {
        type: 'Add_User',
        payload: data
    }
}

export const RemoveUser = index => {
    return {
        type: 'Remove_User',
        index
    }
}