import { s, h, useRef, useState } from "@/internal"

export default function Range({
    value = 0,
    vertical = false,
    parts = [
        { name: "main", size: 100 }
    ],
    activePart = { name: "main", size: 100 },
    getLabel = null,
    onChange = v => v,
    onFree = () => {},
    onClickTrack = () => {},
}) {
    const [dragging, setDragging] = useState(false)
    const thumb = useRef(null)
    const track = useRef(null)
    const percent = `calc(${value*100}% - 5px)`

    function onMouseDown(e) {
        setDragging(true)
        window.addEventListener("mouseup", onMouseUp)
        window.addEventListener("mousemove", onMouseMove)

        // prevent track linsteing
        e.stopPropagation()
    }

    function onMouseUp(e) {
        setDragging(false)
        window.removeEventListener("mouseup", onMouseUp)
        window.removeEventListener("mousemove", onMouseMove)

        onChange(value, "up")
    }

    function onMouseMove(e) {
        let value = vertical 
            ? (thumb.current.offsetTop  + e.movementY + 5)  / track.current.clientHeight 
            : (thumb.current.offsetLeft + e.movementX + 5)  / track.current.clientWidth

        if (value < 0) value = 0
        if (value > 1) value = 1
        
        onChange(value, "drag")
    }

    function onClick(e) {
        let value = vertical
            ? e.offsetY / track.current.clientHeight 
            : e.offsetX / track.current.clientWidth  
        onChange(value, "click")
    }

    return (
        <div 
            role="slider"
            class={s(vertical ? "w-15" : "h-15", arguments[0].class || "")}>
            <div 
                class={s("h-100p", "relative", "no-select")} 
                ref={track} 
                onMouseDown={onClick}>

                <div class={s("flex", "v-middle", "items-center", "h-100p", ["fl-column", vertical])}>
                    {parts.map(({ name, size }) => 
                        <span 
                            style={{ flex: size + "%" }} 
                            className={s("c-line",
                                ...vertical 
                                    ? ["w-1", "my-2"]
                                    : ["h-1", "mx-2"], 
                                ["c-line", name == activePart.name]
                            )}>
                        </span>
                    )}
                </div>
                <div 
                    ref={thumb} 
                    onMouseDown={onMouseDown}
                    style={ vertical ? { top: percent } : { left: percent } }
                    class={s(
                        "absolute", "trans", "c-button", "no-select", "pointer", ["dur-200", !dragging],
                        ...vertical 
                            ? ["transX--50p", "left-50p" , "h-10", "w-100p"]
                            : ["transY--50p", "top-50p"  , "w-10", "h-100p"]
                    )}
                />
            </div> 
        </div>  
    )
}