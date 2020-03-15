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
    removeList: () => {
        return { type: types.REMOVE_LIST, payload: null }
    },
    setPageIndex: index => {
        return { type: types.SET_PAGE_INDEX, payload: index }
    }
}

const initialState = {
    pageIndex: 0,
    lists: [
        {
            name: "Inbox",
            list: [
                // {
                //     title: "Dark Souls I"
                // },
                // {
                //     title: "Dark Souls II"
                // },
                // {
                //     title: "Dark Souls III"
                // }
            ]
        },

        // {
        //     name: "Second One",
        //     list: [
        //         {
        //             title: "Peter"
        //         },
        //         {
        //             title: "Pickled"
        //         },
        //         {
        //             title: "Peppers"
        //         }
        //     ]
        // }
    ]
}

export const reducer = (state = initialState, action) => {
    const { lists, pageIndex } = state
    const { type, payload } = action
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
                lists: [...lists, payload]
            }
            return state
        }
        case types.REMOVE_LIST: {
            return {
                ...state,
                pageIndex: 0,
                lists: lists.filter((list, i) => i !== pageIndex)
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

