export const capture = (video: HTMLVideoElement, scaleFactor = 0.25) => {
    const w = video.videoWidth * scaleFactor;
    const h = video.videoHeight * scaleFactor;
    const canvas = document.createElement('canvas') as HTMLCanvasElement;

    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    ctx!.drawImage(video, 0, 0, w, h);

    return canvas;
};