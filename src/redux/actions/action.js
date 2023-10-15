export const ADD = (item) => {
    return {
        type: "ADD_CART",
        payload: item
    }
}

// remove items
export const DLT = (_id) => {
    return {
        type: "RMV_CART",
        payload: _id
    }
}

// remove individual item

export const REMOVE = (iteam) => {
    return {
        type: "RMV_ONE",
        payload: iteam
    }
}