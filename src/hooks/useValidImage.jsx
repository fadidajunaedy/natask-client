import { useEffect, useState } from "react"
import PlaceholderImage from "../assets/images/placeholder.png"

const useValidImage = (image) => {
    const [validImage, setValidImage] = useState(image)
    
    useEffect(() => {
        if (image) {
            const img = new Image()
            img.src = image
            img.onload = () => setValidImage(image)
            img.onerror = () => setValidImage(PlaceholderImage)
        } else {
            setValidImage(PlaceholderImage)
        }
    }, [image])

    return validImage
}

export default useValidImage