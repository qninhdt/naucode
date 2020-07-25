export function throttle(func, minisecond) {
    let inThrottle = false

    return (...args) => {
        const self = this
        if (!inThrottle) {
            func.apply(self, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, minisecond)
        }
    }
}
