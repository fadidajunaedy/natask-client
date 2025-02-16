import { useEffect, useState } from "react"

const ImagePreview = ({ image }) => {
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        if (!image) {
            setPreview(null)
            return
        }

        if (image instanceof File) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(image)
        } else if (typeof image === "string") {
            setPreview(image)
        } else {
            setPreview(null)
        }
    }, [image])

    return (
        <>
            {preview && (
                <figure className="w-[100%] h-36 rounded-xl overflow-hidden bg-neutral">
                    <img src={preview} alt="Preview" className="w-full h-full object-center object-contain" />
                </figure>
            )}
        </>
    )
}

export default ImagePreview