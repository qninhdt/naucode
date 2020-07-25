import createStore  from "unistore"
import { connect as _connect, Provider } from "unistore/preact"
import devtool from "unistore/devtools"

const store = devtool(createStore({
    profile: null,
    sidebar: {
        scrollValue: 0
    }
}))

const actions = {

    setSideBarScrollValue(state, scrollValue) {
        return {
            sidebar: {
                ...state.sidebar,
                scrollValue
            }
        }
    }
}

const connect = (args) => {
    return _connect(args, actions)
}

export {
    store,
    connect,
    Provider
}