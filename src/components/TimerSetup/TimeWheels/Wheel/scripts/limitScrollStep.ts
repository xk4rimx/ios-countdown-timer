function onScrollStop(
    element: Element,
    callback: () => void,
    refresh = 66,
) {
    let interval: number;
    element.addEventListener(
        "scroll",
        () => {
            clearTimeout(interval);
            interval = setTimeout(callback, refresh);
        },
        false,
    );
}

export default function limitScrollStep(
    element: Element,
    scrollStep: number,
    callback: (element: Element) => void,
) {
    onScrollStop(element, () => {
        const roundedScroll =
            Math.round(element.scrollTop / scrollStep) *
            scrollStep;
        element.scrollTo({
            top: roundedScroll,
            behavior: "smooth",
        });
        callback(element);
    });
}
