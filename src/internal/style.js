import "@/styles/global.css"
import styles from "@/styles/scss/index.scss"

const getClassName = s => s in styles ? styles[s] : s

export default function s(..._styles) {
    let classes = []

    _styles.forEach(style => {
        
        if (Array.isArray(style)) {
            let check = style[style.length - 1]

            style.pop()

            if (check) {
                classes.push(...style.map(s => getClassName(s)))
            }
        } else {
            classes.push(getClassName(style))
        }

    })

    return classes.join(" ")
}