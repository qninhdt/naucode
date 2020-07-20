import { s, h, styled, Component, createRef } from "@/internal"
import { throttle } from "@/utils/functions"

interface RangeProps {
    class     ?: string
    value     ?: number,
    valuePx   ?: number,
    max       ?: number,
    min       ?: number,
    step      ?: number,
    vertical  ?: boolean,
    label     ?: boolean,
    subRanges ?: { name?: string, size: number }[], 
    getLabel  ?: (value: number, rangeName: string) => string | number
}

interface RangeStates {
    value: number,
    dragging: boolean,
    activeRange: { name?: string, size: number },
}

export default class Range extends Component<RangeProps, RangeStates> {

    thumb: any
    track: any

    static defaultProps: RangeProps = {
        class     : "",
        max       : 100,
        min       : 0,
        step      : 1,
        vertical  : false,
        label     : false,
        subRanges : [
            { name: "main", size: 100 }
        ],
        getLabel  : value => value,
    }
    
    constructor(props) {
        super(props)

        props.value = props.value || props.min

        this.setState({
            value: props.value,
            dragging: false,
            activeRange: props.subRanges[0]
        })

        this.thumb = createRef()
        this.track = createRef()
    }

    renderSubRange = ({ name, size }) => (
        // margin between sub-ranges:
        //   *vertical    --> margin-y = 2px
        //   *horizontal  --> margin-x = 2px
        <span style={{ flex: size + "%" }} className={s(this.props.vertical ? "w-1": "h-1", "c-line", this.props.vertical ? "my-2": "mx-2", ["c-line-1", name == this.state.activeRange.name])}/>
    )

    componentDidMount() {
        window.addEventListener("mouseup", this.onMouseUp)
        window.addEventListener("mousemove", this.onMouseMove)
    }

    componentWillUnmount() {
        window.removeEventListener("mouseup", this.onMouseUp)
        window.removeEventListener("mousemove", this.onMouseMove)
    }

    onMouseDown = (e: MouseEvent) => {
        this.setState({ dragging: true })

        // prevent track linsteing
        e.stopPropagation()
    }

    onMouseUp = (e: MouseEvent) => {
        if (this.state.dragging) {
            this.setState({ 
                dragging: false,
                value: Math.round(this.state.value / this.props.step) * this.props.step
            })
        }
    }

    onMouseMove = (e: MouseEvent) => {
        if (this.state.dragging) {
            let nextValue = this.state.value + (
                this.props.vertical 
                    ? e.movementY / this.track.current.clientHeight 
                    : e.movementX / this.track.current.clientWidth
            ) * (this.props.max - this.props.min + 1)

            nextValue = Math.max(nextValue, this.props.min)
            nextValue = Math.min(nextValue, this.props.max)

            this.setState({ value: nextValue })
        }
    }

    onClick = (e: MouseEvent) => {
        let [offset, len] = this.props.vertical
            ? [ e.offsetY , this.track.current.clientHeight ]
            : [ e.offsetX , this.track.current.clientWidth  ]
        let stepLen = len / (this.props.max - this.props.min + 1)

        this.setState({ value: Math.floor(offset / stepLen) + this.props.min })
    }

    render({ vertical, subRanges, max, min }, { value, dragging }) {

        const percent = `calc(${(value-min+0.5) / (max-min+1) * 100}% - 5px)`

        return (
                <div class={s(vertical ? "w-15" : "h-15", "relative", "no-select", this.props.class)} ref={this.track} onMouseDown={this.onClick}>
                    <div class={s("flex", "v-middle", "items-center", "h-100p", ["fl-column", vertical])}>
                        { subRanges.map(this.renderSubRange) }
                    </div>
                    <div 
                        ref={this.thumb} 
                        onMouseDown={this.onMouseDown}
                        style={ vertical ? { top: percent } : { left: percent } }
                        class={s(
                            "absolute", "trans", "c-button", "no-select", "pointer", ["dur-100", !dragging],
                            ...vertical 
                                ? ["transX--50p", "left-50p" , "h-10", "w-100p"]
                                : ["transY--50p", "top-50p"  , "w-10", "h-100p"]
                        )}
                    />
                </div>   
        )
    }
}