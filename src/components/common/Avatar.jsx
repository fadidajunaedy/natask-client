import classNames from "classnames"
import useValidImage from "../../hooks/useValidImage"

const Avatar = ({ size, type = "mask", src, alt }) => {
    const figureClassNames = classNames(
        "relative aspect-square overflow-hidden",
        {
            "mask mask-squircle": type === "mask",
            "rounded-lg": type === "box",
            "rounded-full": type === "circle",
        },
        {
            "w-14 h-14": !size, // Default jika size tidak diisi
        }
    )

    return (
        <figure className={figureClassNames} style={size ? { width: size, height: size } : {}}>
            <img src={useValidImage(src)} alt={alt} className="w-full h-full object-cover" />
        </figure>
    )
}


export default Avatar