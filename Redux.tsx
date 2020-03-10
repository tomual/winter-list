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
    page: 'Inbox',
    lists: {
        "Inbox" : [
            // { title: 'Dark Souls I' },
            // { title: 'Dark Souls II' },
            // { title: 'Dark Souls III' },
        ]
    }
}

export const reducer = (state = initialState, action) => {
    const { lists, page } = state
    const { type, payload } = action

    switch (type) {
        case types.ADD: {
            return {
                ...state,
                lists: {[page]: [payload, ...lists[page]]}
            }
        }
        case types.REMOVE: {
            return {
                ...state,
                lists: {[page]: lists[page].filter((todo, i) => i !== payload)}
            }
        }
    }

    return state
}