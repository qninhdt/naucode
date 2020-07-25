import { h, Component, Fragment, Route } from "@/internal"

export default class Lazy extends Component {

    constructor(props) {
        super(props)

        this.setState({
            component: null
        })
    }

    async componentWillMount() {
        const module = await this.props.component()

        this.setState({
            component: module.default
        })
    }

    render(props, { component }) {
        return component ? h(component, {}) : <Fragment/>
    }
}

export function LazyRoute({ component, path, key }) {
    return <Route path={path} key={key} component={() => <Lazy component={component}/>}/>
}