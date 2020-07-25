import { s, h, Component, createRef, connect } from "@/internal"
import Range from "@/elements/Range"

class Scrollable extends Component {

    _content = createRef()

    get content() {
        return this._content.current
    }

    onScoll = e => {
        let value = this.content.scrollTop / (this.content.scrollHeight - this.content.clientHeight)

        this.props.setSideBarScrollValue(value)
    }

    componentWillReceiveProps({ sidebar }) {
        this.content.scrollTop = sidebar.scrollValue * (this.content.scrollHeight - this.content.clientHeight)
    }

    render({ children }) {
        return (
            <div class={s(this.props.class, "flex", "fl-colmn", "h-100vh")}>
                <div class={s("fl-1", "of-auto", "no-scrollbar", "h-100p")} ref={this._content} onScroll={this.onScoll} >
                    {children}
                </div>
            </div>
        )
    }
}

export default connect("sidebar")(Scrollable)