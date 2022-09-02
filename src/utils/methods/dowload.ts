export const download = (chunks: Blob[]) => {
    const blob = new Blob(chunks);
    const fileUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = fileUrl;
    link.download = new Date().getTime() + '.mp4';
    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();
    link.remove();
};