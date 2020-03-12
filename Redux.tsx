export const types = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    ADD_LIST: 'ADD_LIST',
    REMOVE_LIST: 'REMOVE_LIST',
    SET_PAGE_INDEX: 'SET_PAGE_INDEX',
}

export const actionCreators = {
    add: item => {
        return { type: types.ADD, payload: item }
    },
    remove: index => {
        return { type: types.REMOVE, payload: index }
    },
    addList: item => {
        return { type: types.ADD_LIST, payload: item }
    },
    removeList: index => {
        return { type: types.REMOVE_LIST, payload: index }
    },
    setPageIndex: index => {
        return { type: types.SET_PAGE_INDEX, payload: index }
    }
}

const initialState = {
    pageIndex: 0,
    lists: [
        // {
        //     name: "Inbox",
        //     list: [
        //         // {
        //         //     title: "Dark Souls I"
        //         // },
        //         // {
        //         //     title: "Dark Souls II"
        //         // },
        //         // {
        //         //     title: "Dark Souls III"
        //         // }
        //     ]
        // },

        // {
        //     name: "Second One",
        //     list: [
        //         {
        //             title: "Dark Souls I"
        //         },
        //         {
        //             title: "Dark Souls II"
        //         },
        //         {
        //             title: "Dark Souls III"
        //         }
        //     ]
        // }
    ]
}

export const reducer = (state = initialState, action) => {
    const { lists, pageIndex } = state
    const { type, payload } = action
    console.log("PAYLOAD --------------------------------------")
    console.log(payload)
    console.log("pageIndex " + pageIndex)
    switch (type) {
        case types.ADD: {
            lists[pageIndex].list = [payload, ...lists[pageIndex].list]
            state = {
                ...state,
                lists: lists
            }
            return state
        }
        case types.REMOVE: {
            lists[pageIndex].list = lists[pageIndex].list.filter((todo, i) => i !== payload)
            return {
                ...state,
                lists: lists
            }
        }
        case types.ADD_LIST: {
            state = {
                ...state,
                lists: [payload, ...lists]
            }
            return state
        }
        case types.REMOVE_LIST: {
            return {
                ...state,
                lists: lists.filter((list, i) => i !== payload)
            }
        }
        case types.SET_PAGE_INDEX: {
            state = {
                ...state,
                pageIndex: payload
            }
            return state
        }
    }

    return state
}