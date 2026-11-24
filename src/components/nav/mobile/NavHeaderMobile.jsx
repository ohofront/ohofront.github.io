import "./NavHeaderMobile.scss"
import React from 'react'
import {useGlobalState} from "/src/providers/GlobalStateProvider.jsx"
import {useData} from "/src/providers/DataProvider.jsx"
import LanguagePicker from "/src/components/widgets/LanguagePicker.jsx"
import ThemePicker from "/src/components/widgets/ThemePicker.jsx"
import ToolButton from "/src/components/generic/ToolButton.jsx"
import NavHeader from "/src/components/nav/desktop/NavHeader.jsx"
import NavPills from "/src/components/nav/mobile/NavPills.jsx"
import Box from "/src/components/wrappers/Box.jsx"

function NavHeaderMobile() {
    const {getCategorySections} = useData()
    const {getActiveCategory, toggleMetaverseMode} = useGlobalState()

    const category = getActiveCategory()
    const sections = getCategorySections(category)

    const handleDownloadPdf = () => {
        const link = document.createElement('a')
        link.href = '/portfolio.pdf'
        link.download = '조영호_포트폴리오.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <Box nav={true} id={`nav-mobile-top`} className={`nav-mobile-top`}>
            <div className={`float-top-left`}>
                <LanguagePicker shrink={true}/>
            </div>

            <div className={`float-top-right d-flex gap-2 align-items-center`}>
                <ToolButton
                    icon="fa-solid fa-file-arrow-down"
                    tooltip="포트폴리오 PDF 다운로드"
                    onClick={handleDownloadPdf}
                />
                <ToolButton
                    icon="fa-solid fa-cube"
                    tooltip="3D 메타버스 월드 입장"
                    onClick={() => toggleMetaverseMode(true)}
                />
                <ThemePicker shrink={true}/>
            </div>

            <NavHeader shrink={false}/>

            <div className={`mt-4`}>
                {category && sections.length > 1 && (
                    <NavPills sections={sections}/>
                )}
            </div>
        </Box>
    )
}

export default NavHeaderMobile