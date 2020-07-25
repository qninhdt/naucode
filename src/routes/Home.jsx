import { h, s , Component} from "@/internal"
import NumbericRange from "@/elements/NumbericRange"

export default class Home extends Component {

    state = {
        value: 1
    }

    onChange = value => {
        this.setState({ value })
    }

    render(props, { value }) {
        return (
            <div class={s("px-100", "py-100")}>
                <NumbericRange 
                    class={s("h-500")}
                    value={value} 
                    min={0}
                    max={5}
                    onChange={this.onChange}
                    parts={Array(6).fill({ size: 1 })}
                    vertical
                />
            </div>
        )
    }
}