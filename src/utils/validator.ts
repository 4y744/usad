
export const useUsernameValidator = () => {
    
}

export const validateBase64String = (str: string) => {
    try{
        return atob(str);
    }
    catch{
        return "[not available]"
    }
}