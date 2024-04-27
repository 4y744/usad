/** Copy text to the clipboard of the device.
 * @param text - The string you want to copy.
 * @param fallback - Called if the event fails.
 */
export const copyToClipboard = (text: string, fallback?: () => void) => {

    /*
        This does not work on certain devices like
        iPhones when the connection is using an unsecure
        protocol like http.
    */

    try{

        navigator.clipboard.writeText(text);

    }
    catch{

        if(fallback){

            fallback();
            
        }

    }
    
}
