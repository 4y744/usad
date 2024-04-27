//Import React misc
import { forwardRef} from "react"

export const Filepicker = forwardRef<HTMLInputElement>(({}, inputRef) => {

    return (
        <input type="file"
        className="hidden"
        ref={inputRef}/>
    )
});