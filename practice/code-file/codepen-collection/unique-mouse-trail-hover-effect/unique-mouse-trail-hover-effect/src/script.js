const cursor = document.querySelector(".cb-cursor");
window.onpointermove = event => {
    const { clientX, clientY } = event;
    cursor.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, { duration: 3000, fill: "forwards" })
}
const elements = [...document.querySelectorAll("h2 div")]
elements.map(element => {
    element.onmouseover = () => {
        cursor.classList.add("-video")
    }
    element.onmouseout = () => {
        cursor.classList.remove("-video")
    }
})