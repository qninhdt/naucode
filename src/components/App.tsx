import { s, h, Component } from "@/internal"
import Range from "@/elements/Range"

export default class App extends Component {

    render = () => (
        <div class={s("px-150", "py-150")}>
            <Range 
                min={0}
                max={1000}
            />
        </div>
    )
}