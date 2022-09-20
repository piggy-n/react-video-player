import MP4Box from 'mp4box';
import type { Dispatch } from 'react';
import type { MergeActionType } from '@/utils/hooks/useVideoModel';

interface Options {
    dispatch: Dispatch<MergeActionType>;
}

export class VideoPlayer {
    ele?: HTMLVideoElement;
    url?: string;
    mime: string;
    mediaSource?: MediaSource;
    MP4BoxFile?: Record<string, any>;
    dispatch: Dispatch<MergeActionType>;
    sourceOpenHandler?: () => void;

    constructor(options: Options) {
        this.mime = '';
        this.dispatch = options.dispatch;
    }

    fetch(url: string, callback: any) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'arraybuffer';

        xhr.onloadstart = () => {
            this.dispatch({
                type: 'downloading',
                payload: true
            });
        };

        xhr.onloadend = () => {
            this.dispatch({
                type: 'downloading',
                payload: false
            });
        };

        xhr.onprogress = (e) => {
            if (e.lengthComputable) {
                const percentComplete = ((e.loaded / e.total) * 100).toFixed(2);

                this.dispatch({
                    type: 'percentComplete',
                    payload: percentComplete
                });
            }
        };

        xhr.onload = () => {
            callback(xhr.response);
        };

        xhr.onerror = () => {
            this.dispatch({
                type: 'downloading',
                payload: false
            });
        };

        xhr.send();
    }

    registerEvents() {
        if (!this.MP4BoxFile) return;

        this.MP4BoxFile.onReady = (info: any) => {
            if (info.mime && MediaSource.isTypeSupported(info.mime)) {
                this.mime = info.mime;

                this.dispatch({
                    type: 'mime',
                    payload: this.mime.includes('hvc1') ? 'H.265' : 'H.264',
                });
            }
        };
    }

    start(ele?: HTMLVideoElement, url?: string) {
        this.stop();

        if (ele && url) {
            this.ele = ele;
            this.url = url;
        }

        if (!this.ele || !this.url) return;
        if (this.MP4BoxFile) return;

        this.MP4BoxFile = MP4Box.createFile();
        this.registerEvents();

        this.fetch(this.url, (buf: any) => {
            this.ele!.onload = () => {
                URL.revokeObjectURL(this.ele!.src);
            };

            this.ele!.src = URL.createObjectURL(new Blob([buf]));

            if (!this.mime) {
                buf.fileStart = 0;
                this.MP4BoxFile?.appendBuffer(buf);
            }
        });
    }

    stop() {
        if (this.MP4BoxFile) {
            this.MP4BoxFile.stop();
        }

        if (this.mediaSource) {
            this.sourceOpenHandler && this.mediaSource.removeEventListener('sourceopen', this.sourceOpenHandler);
            this.mediaSource = undefined;
        }
    }
}
