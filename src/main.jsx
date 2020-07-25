import { render, h, Provider, store } from "@/internal"
import App from "@/components/App"

render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.body
)
