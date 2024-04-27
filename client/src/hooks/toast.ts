//Import types
import { ToastType } from "../types";

export const useToast = () => {

    /**
     * Adds a toast to the bottom right of the screen.
     * @param toast - The toast you want to add.
     * @note Tasty!
     */
    const AddToast = (toast : ToastType) => {

        const event = new CustomEvent<ToastType>("addToast", {detail: toast});

        document.dispatchEvent(event);
    }

    return {AddToast} 
}