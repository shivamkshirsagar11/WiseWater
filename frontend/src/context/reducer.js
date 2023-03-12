export const initialState = {
    userData: null
};

export function reducer(state, action) {
    switch (action.type) {
        case "setUserData":
            return { ...state, userData: action.payload };
        case "setProperty":
            return { ...state, [action.propertyName]: action.payload }; // using computed property names
        default:
            throw new Error();
    }
}
