//Import types
import { PopupType } from "../types";

export const usePopup = () => {

    /**
     * Shows a pupup with the given information.
     * @param popup - The popup you want to show.
     */
    const SetPopup = (popup: PopupType) => {

        const event = new CustomEvent<PopupType>("setPopup", {detail: popup});

        document.dispatchEvent(event);
        
    }

    return {SetPopup};
}