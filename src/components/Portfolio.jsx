import "./Portfolio.scss"
import React, {useEffect, useState} from 'react'
import NavSidebar from "/src/components/nav/desktop/NavSidebar.jsx"
import MainSlider from "/src/components/layout/MainSlider"
import NavHeaderMobile from "/src/components/nav/mobile/NavHeaderMobile.jsx"
import NavTabController from "/src/components/nav/mobile/NavTabController.jsx"
import NavPillsFixed from "/src/components/nav/mobile/NavPillsFixed.jsx"
import FullMetaverseWorld from "/src/components/metaverse/FullMetaverseWorld.jsx"
import FaIcon from "/src/components/generic/FaIcon.jsx"
import {useGlobalState} from "/src/providers/GlobalStateProvider.jsx"
import {useUtils} from "/src/helpers/utils.js"

function Portfolio() {
    const {getActiveSection, setFixedNavigationEnabled, metaverseMode, toggleMetaverseMode} = useGlobalState()
    const [isFirstPage, setIsFirstPage] = useState(true)
    const utils = useUtils()

    useEffect(() => {
        if(utils.isTouchDevice() && utils.isAndroid()) {
            utils.addClassToBody('body-android')
        }
    }, [])

    /** Force scroll to top every time the active section changes... **/
    useEffect(() => {
        if (metaverseMode) return

        const __first = isFirstPage
        const top = 258
        const scrollParams = {top: top, behavior: 'instant'}
        setIsFirstPage(false)
        if(__first || window.scrollY < top)
            return

        setFixedNavigationEnabled(false)
        window.scrollTo(scrollParams)

        setTimeout(() => {
            window.scrollTo(scrollParams)
            setFixedNavigationEnabled(true)
        }, 100)
    }, [getActiveSection(), metaverseMode])

    if (metaverseMode) {
        return (
            <FullMetaverseWorld onToggleMode={() => toggleMetaverseMode(false)} />
        )
    }

    return (
        <div className={`portfolio-wrapper`}>
            {/* Floating button to switch to 3D Metaverse World */}
            <button
                className="btn-floating-metaverse-switch"
                onClick={() => toggleMetaverseMode(true)}
                title="3D 메타버스 월드로 입장합니다"
                aria-label="3D 메타버스 월드로 입장"
            >
                <FaIcon iconName="fa-solid fa-cube" />
                <span>🎮 3D 메타버스 모드</span>
            </button>

            <div className={`portfolio`} id={`portfolio`}>
                <div className={`sidebar-wrapper`}>
                    <NavSidebar/>
                </div>

                <div className={`content-wrapper`}>
                    <div className={`content`}>
                        <NavHeaderMobile/>
                        <MainSlider/>
                    </div>
                </div>

                <NavPillsFixed/>

                <div className={`nav-tabs-wrapper`}>
                    <NavTabController/>
                </div>
            </div>
        </div>
    )
}

export default Portfolio