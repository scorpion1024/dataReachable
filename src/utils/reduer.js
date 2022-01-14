const store = {
    userList: [
        {
            name: "Monica",
            email: "monica.li@ekas.com",
            permissions: "owner",
        },
        {
            name: "Lawrence",
            email: "lawrence.liu@ekas.com",
            permissions: "",
        },
    ],
    organizationList: [{ name: "Ekas Pty Ltd" }]
};

const reducer = (state = store, action) => {
    switch (action.type) {
        case 'user':
            return Object.assign({}, state, { userList: [...action.value] });
        case 'organization':
            return Object.assign({}, state, { organizationList: [...action.value] });
        default:
            return state;
    }
}

export default reducer;