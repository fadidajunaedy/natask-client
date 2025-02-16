import classNames from "classnames"

const Image = ({ 
    width,
    height,
    src, 
    alt, 
    caption
}) => {
    const figureClassNames = classNames(
        {
            "w-full": !width, 
            "h-full": !height,
            [`w-${width}`]: width,
            [`h-${height}`]: height,
        },
        "object-center object-cover"
    );

    return (
        <figure className="rounded-lg overflow-hidden">
            <img
                src={src}
                srcSet={!src && `https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp`}
                alt={alt}
                className={figureClassNames}
            />
            {caption && (
            <figcaption className="mt-2 text-sm text-gray-600 italic">
                {caption}
            </figcaption>
            )}
        </figure>
    )
}

export default Image