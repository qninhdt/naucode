import { h, useState, Component } from "@/internal"
import Range from "./Range"

export default class NumbericRange extends Component {

    static defaultProps = { 
        min : 0, 
        max : 100, 
    } 

    constructor(props) {
        super(props)
        
        this.state = {
            _value: (this.props.value - this.props.min + 0.5) / (this.props.max - this.props.min + 1)
        }
    }

    _onChange = (_value, type) => {
        let newValue = _value * (this.props.max - this.props.min + 1) + this.props.min - 0.5
        newValue = Math.round(newValue)
        newValue = Math.min(newValue, this.props.max)

        if (this.props.value != newValue) {
            this.props.onChange(newValue)
        }

        if (type == "drag") {
            this.setState({ _value })
        } else {
            this.setState({ _value: ((type == "click" ? newValue : this.props.value) - this.props.min + 0.5) / (this.props.max - this.props.min + 1) })
        }
    }

    render(props, { _value }) {
        const { value, onChange, ..._props } = props

        return (
            <Range 
                {..._props}
                value={_value} 
                onChange={this._onChange}
            />
        )
    }
}