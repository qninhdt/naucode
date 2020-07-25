import { h, s , Component} from "@/internal"
import ScrollablePage from "@/elements/ScrollablePage"
import NumbericRange from "@/elements/NumbericRange"

export default class About extends Component {

    state = {
        value: 0
    }

    render(props, {value}) {
        return (
            <ScrollablePage class={s("px-100", "py-100")}>
             
            </ScrollablePage>
        )
    }
}