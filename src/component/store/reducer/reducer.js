import actionType from "../constant/constant"

const userData = {
    userName: "sanjay",
    age: 28,
    profetion: "Software Engineer"
}

export default (states = userData, action) => {
    switch (action.type) {
        case actionType.changeUserName : return({
            ...states,
            userName : action.payload
        })
        default:
            return states;
    }
}