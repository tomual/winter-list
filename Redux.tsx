export const types = {
    ADD: 'ADD',
    REMOVE: 'REMOVE'
}

export const actionCreators = {
    add: item => {
        return { type: types.ADD, payload: item }
    },
    remove: index => {
        return { type: types.REMOVE, payload: index }
    }
}

const initialState = {
    pageIndex: 0,
    lists: [
        {
            name: "Inbox",
            list: [
                {
                    title: "Dark Souls I"
                },
                {
                    title: "Dark Souls II"
                },
                {
                    title: "Dark Souls III"
                }
            ]
        },

        {
            name: "Second One",
            list: [
                {
                    title: "Dark Souls I"
                },
                {
                    title: "Dark Souls II"
                },
                {
                    title: "Dark Souls III"
                }
            ]
        }
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
    }

    return state
}