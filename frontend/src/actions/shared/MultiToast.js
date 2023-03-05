import { toast } from 'react-toastify';
const MultiToast = (message, isError) => {
    console.log(message);
    if (typeof message === typeof " ") {
        if (isError)
            toast.error(message);
        else
            toast.success(message);
    }
    else {
        message.map((ele) => {
            if (isError)
                toast.error(ele);
            else
                toast.success(ele);
        })
    }
}

export default MultiToast