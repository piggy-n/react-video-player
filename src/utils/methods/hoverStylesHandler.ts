export const hoverStylesHandler = (
    args: {
        height: number,
        opacity: number,
        aniName: string,
        progressWrapperEle: HTMLDivElement,
        progressControlPointEle: HTMLDivElement
    }
) => {
    const {
        height,
        opacity,
        aniName,
        progressWrapperEle,
        progressControlPointEle
    } = args;

    progressWrapperEle.style.height = `${height}px`;
    progressControlPointEle.style.opacity = `${opacity}`;
    progressControlPointEle.style.animation = `${aniName} 0.5s`;
};