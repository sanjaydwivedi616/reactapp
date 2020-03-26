
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

export const EditUser = index => {
    return {
        type: 'Edit_User',
        index
    }
}