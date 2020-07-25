import { h, s, styled, Component, createRef } from "@/internal/index"
import Svg from "@/elements/Svg"

const Header = styled.header`

    & b:after {
        content: "";
        position: absolute;
        bottom: -2px;
        right: 0;
        height: 1px;
        width: 25px;
        background: var(--c-line);
    }
`

const JoinButton = styled.button`

    &:active {
        --c-button-1: var(--c-button-cl);
        --c-button: var(--c-button-1-cl);
    }

    span {
        bottom: -8px;
        border-radius: 100%;
    }

    &:hover {
        span {
            bottom: -7px;
            height: 1px;
            width: 20px;
        }
    }
`

const MenuLink = styled.a`

    &:after {
        content: "";
        width: 1px;
        height: 0;
        background: var(--c-button);
        transition-duration: .5s;
        position: absolute;
        bottom: 24px;
        left: 50%;
    }
    &:hover:after {
        height: 10px;
    }
    &.active:after {
        height: 18px;
    }
`

const LinkBorder = styled.div`
    border-color: var(--c-button);
`

class HeaderBar extends Component {

    constructor(props) {
        super(props)
    
        this.links = [
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "WC", path: "/wc" }
        ]

        this.nav = createRef()
        this.linkBorder = createRef()
    }

    render({ route }) {
        return (
            <div class={s("fixed", "w-100p")}>   
                <Header className={s("flex", "py-15", "px-150", "items-center", "mb:px-25", )}>

                    {/* left */}
                    <a href="/">
                        <Svg class={s("h-25", "w-25", "mx-10")} src={require("@/assets/logo.svg")}/>
                    </a>
                    <span class={s("h6","c-text", "mb:none")}>Nau<b class={s("mx-2", "relative")}>code</b></span>
                
                    {/* right */}
                    <div class={s("ml-auto", "flex", "items-center")}>
                        <nav class={s("mb:none", "mx-25", "relative")} ref={this.nav}>
                            {this.links.map(({ name, path }) => <MenuLink className={s("c-text", "px-10", "py-2", "relative", ["bolder", "active", name==route.current.key])} href={path}>{name}</MenuLink>)}
                            <LinkBorder ref={this.linkBorder} className={s("dur-300", "b-1", "bs-solid", "h-100p", "absolute", "top-0")}/>
                        </nav>
                        <JoinButton className={s("c-button-gradient", "dur-200", "relative", "h6", "b-0", "h-30", "w-60", "c-text-button")}>
                            Join
                            <span class={s("absolute", "dur-100", "h-3", "w-3", "c-button", "left-50p", "transX--50p", "trans")}></span>
                        </JoinButton>
                    </div>

                </Header>
            </div>
        )
    }

    updateLinkBorder() {
        const activeLink = this.nav.current.getElementsByClassName("active")[0]
        this.linkBorder.current.style.left = activeLink.offsetLeft + "px"
        this.linkBorder.current.style.width = activeLink.offsetWidth + "px"
    }

    componentDidMount() {
        this.updateLinkBorder()
    }

    componentDidUpdate() {
        this.updateLinkBorder()
    }
}

export default HeaderBar