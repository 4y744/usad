import { useEffect, useState } from "react"
import { ToastType } from "../types";

const ToastTypes = {
    success: {
        color: "green-700",
        icon: "fa-solid fa-check"
    },
    error: {
        color: "red-700",
        icon: "fa-solid fa-triangle-exclamation"
    },
    info: {
        color: "sky-700",
        icon: "fa-solid fa-info"
    }
}

export const Toast = () => {

    const [toasts, setToasts] = useState<ToastType[]>([]);

    const handleToast = (event: CustomEventInit<ToastType>) => {

        const toast = event.detail!;

        setToasts(prev => [...prev, toast]);

    }

    //The toasts are removed in chunks, because otherwise
    //the re-render caused by setToasts would reset the exit animation.
    const clearToast = (index: number) => {

        if(index == toasts.length - 1){
            setToasts([]);
        }
    }

    useEffect(() => {
        
        document.addEventListener("addToast", handleToast)

    }, []);

    return (
        <div className="fixed right-0 md:bottom-0 bottom-14
        grid gap-2 pointer-events-none">
            
            {toasts.map((toast, index) => (
                <div className={`flex items-center gap-2
                bg-${ToastTypes[toast.type].color} rounded-md shadow-md p-2
                lg:w-[400px] w-[300px] lg:h-[80px] h-[60px] max-w-[90vw]
                animate-toast translate-x-full`}
                onAnimationEndCapture={() => clearToast(index)}
                key={index}>
        
                    <div className="flex justify-center items-center
                    lg:p-4 p-2">

                        <i className={`${ToastTypes[toast.type].icon}
                        lg:text-2xl text-lg`}/>

                    </div>
        
                    <div>

                        <h1 className="font-medium lg:text-base text-xs">{toast.title}</h1>
        
                        <p className="lg:text-xs text-2xs text-zinc-300">{toast.text}</p>

                    </div>
        
                </div>
            ))}
            
        </div>
    )
}
