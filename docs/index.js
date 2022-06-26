const processImages = () => {
    const images = document.querySelectorAll("img")

    for (const image of images) {
        if (image.dataset.type !== "swap") {
            continue
        }

        image.style.visibility = "hidden"

        if (image.naturalWidth || image.naturalHeight) {
            replaceImage(image)
            continue
        }

        image.addEventListener("load", () => {
            replaceImage(image)
        })
    }
}

const replaceImage = (image) => {
    const w = image.offsetWidth
    const h = image.offsetHeight
    const id = "x" + Math.floor(10000 + Math.random() * 10000).toString(16)
    const replacement = document.createElement("div")
    const style = document.createElement("style")
    const rules = [
        "width:" + w + "px",
        "height:" + h + "px",
        "background-image: url('" + getImageDataURL(image) + "')",
        "background-size: contain",
        "background-repeat: no-repeat",
        "pointer-events: none",
        "user-select: none"
    ].join(";")

    style.id = id
    style.innerText = "." + id + "{" + rules + "}"

    document.querySelector("head").appendChild(style)

    replacement.id = id
    replacement.className = id

    image.parentElement.replaceChild(replacement, image)
}

const getImageDataURL = (image) => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")

    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    context.drawImage(image, 0, 0)

    const dataURL = canvas.toDataURL("image/jpeg")

    canvas.width = 0
    canvas.height = 0

    return dataURL
}

processImages()
