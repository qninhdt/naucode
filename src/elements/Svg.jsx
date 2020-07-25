import { h, s } from "@/internal"

export default function Svg(props) {
    return (
        <div class={s(props.class, "inline-block")} dangerouslySetInnerHTML={{__html: props.src}}></div>
    )
}