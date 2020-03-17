
const users = ["sanjay", "rahul", "mohan"];

const user = (state = users, action) => {
    switch (action.type) {
        case "Add_User":
            return [...state, action.payload];

        case "Remove_User":
            return state.filter((item, index) => action.index !== index);

        default:
            return state;
    }
}

export default user;