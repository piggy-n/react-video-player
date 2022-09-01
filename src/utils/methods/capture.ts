export const capture = (video: HTMLVideoElement) => {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    const w = video.videoWidth;
    const h = video.videoHeight;

    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    ctx!.drawImage(video, 0, 0, w, h);

    return canvas;
};