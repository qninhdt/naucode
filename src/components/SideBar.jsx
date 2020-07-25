import { h, s, styled, Component, connect } from "@/internal"
import Svg from "@/elements/Svg"
import Range from "@/elements/Range"

class SideBar extends Component {

    constructor(props) {
        super(props)

        this.setState({

        })
    }

    onScroll = (value, type) => {
        if (type != "up") {
            this.props.setSideBarScrollValue(value)
        }
    }

    render({ sidebar, setSideBarScrollValue }) {
        return (
            <div className={s("fixed", "h-80p", "top-10p", "right-25")}>
                <div class={s("flex", "fl-column", "items-center", "h-100p")}>
                    <div>
                        <Svg class={s("h-20", "w-20", "svg-icon", "my-5")} src={require("@/assets/search.svg")}/>
                    </div>
                    <div>
                        <Svg class={s("h-20", "w-20", "svg-icon", "my-5")} src={require("@/assets/achievement.svg")}/>
                    </div>
                    <Range value={sidebar.scrollValue} onChange={this.onScroll} class={s("fl-1", "my-25")} vertical/>
                </div>
            </div>
        )
    }
}

export default connect("sidebar")(SideBar)