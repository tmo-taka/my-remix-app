type Props = {
    judgeTopPath: boolean
}

export const Header =(props:Props) => {
    const baseStyle = "px-6 py-5 min-w-pcMin relative"
    const normalStyle = `${baseStyle} bg-base`;
    const topStyle = `${baseStyle} bg-[transparent]`
    return (
        <header className={props.judgeTopPath ? topStyle : normalStyle}>
            <div className="bg-gradient-to-r from-[#3F51B5] via-[#9C27B0] to-primary w-full h-1 absolute top-0 left-0"></div>
            <div className="mx-auto w-screen-pcMin text-white font-bold text-lg tracking-wide">
                Remixテスト
            </div>
        </header>
    )
}