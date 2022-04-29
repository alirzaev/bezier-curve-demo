export function dragElement(el, cb) {
    let prevX = 0, prevY = 0, curX = 0, curY = 0;

    el.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e ?? window.event;
        e.preventDefault();

        prevX = e.clientX;
        prevY = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e ?? window.event;

        curX = prevX - e.clientX;
        curY = prevY - e.clientY;
        prevX = e.clientX;
        prevY = e.clientY;

        el.style.top = `${el.offsetTop - curY}px`;
        el.style.left = `${el.offsetLeft - curX}px`;

        if (cb && typeof cb === 'function') {
            cb(el.offsetLeft - curX, el.offsetTop - curY)
        }
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
