import { forwardRef } from "react"
import { SHELL_URL } from "../config"

export const Sandbox = forwardRef<HTMLIFrameElement>(({}, sandboxRef) => {

    return (
        <iframe 
        sandbox="allow-same-origin allow-scripts"
        className='hidden'
        src={SHELL_URL} ref={sandboxRef}/>
    )
})