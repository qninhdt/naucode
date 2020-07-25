import { s, h, Component, Router, Route, connect } from "@/internal"
import { LazyRoute } from "@/elements/Lazy"

import HeaderBar from "@/components/HeaderBar"
import SideBar from "@/components/SideBar"
import Home from "@/routes/Home"

const Blog = () => import("@/routes/Blog")
const WC = () => import("@/routes/WC")

class App extends Component {

    constructor(props) {
        super(props)

        this.setState({
            route: null
        })
    }

    render(props, { route }) {
        return (
            <div class={s("h-100vh")}>
                {/* header-bar */}
                { route && <HeaderBar route={route}/> }
                <SideBar/>

                {/* content */}
                <Router onChange={route => this.setState({ route })}>
                    <Route path="/" key="Home" component={Home}/>
                    <LazyRoute path="/blog" key="Blog" component={Blog}/>
                    <LazyRoute path="/wc" key="WC" component={WC}/>
                </Router>
            </div>
        )
    }
}

export default App