import MP4Box from 'mp4box';

class StreamH265Player {
    ws?: WebSocket;
    ele: HTMLVideoElement; // 流媒体播放器DOM
    url: string; // 流媒体地址
    mime?: string;
    streaming = false;
    mediaSource: MediaSource;
    MP4BoxFile?: any;
    connectionTimes = 0;
    sourceBuffer?: SourceBuffer;
    arrayBuffer: ArrayBuffer[] = []; // 媒体数据包队列

    onMessage(e: MessageEvent) {
        const { data } = e;
        const latestDuration = this.ele.duration;
        const latestCurrentTime = this.ele.currentTime;

        if (!this.mime) {
            data.fileStart = 0;
            this.MP4BoxFile.appendBuffer(data);
        }

        if (!this.streaming) {
            const arrayBuffer = this.arrayBuffer.shift();

            if (arrayBuffer && this.sourceBuffer) {
                this.sourceBuffer.appendBuffer(arrayBuffer);
                this.streaming = true;
            }
        }

        if (latestDuration - latestCurrentTime > 0.9) {
            this.ele.currentTime = latestDuration - 0.5;
        }

        this.arrayBuffer.push(data);
    }

    sourceOpen() {
        URL.revokeObjectURL(this.ele.src);

        this.mediaSource.duration = 1;

        this.ws = new WebSocket(this.url);
        this.ws.binaryType = 'arraybuffer';

        this.ws.onmessage = (e) => {
            this.onMessage(e);
        };

        this.ws.onopen = () => {
            this.connectionTimes = 0;
        };

        this.ws.onclose = () => {
            this.connectionTimes++;

            if (this.connectionTimes <= 3) {
                this.ws = new WebSocket(this.url);
            }
        };

        this.ws.onerror = () => {
            this.ws?.close();
            this.MP4BoxFile?.stop();
        };
    }

    load() {
        if (this.sourceBuffer?.updating) return;

        if (this.arrayBuffer.length > 0) {
            this.sourceBuffer!.appendBuffer(this.arrayBuffer.shift() as any);
        } else {
            this.streaming = false;
        }
    }

    start(ele?: HTMLVideoElement, url?: string) {
        if (ele && url) {
            this.ele = ele;
            this.url = url;
        }

        console.dir(this.ele);

        if (!this.ele || !this.url) return;

        this.mediaSource = new MediaSource();
        this.MP4BoxFile = MP4Box.createFile();
        this.ele.src = URL.createObjectURL(this.mediaSource);

        this.mediaSource.addEventListener(
            'sourceopen',
            this.sourceOpen.bind(this)
        );

        this.MP4BoxFile.onReady = ((info: { mime: string | undefined; }) => {
            if (info.mime && MediaSource.isTypeSupported(info.mime)) {
                this.mime = info.mime;
                this.sourceBuffer = this.mediaSource?.addSourceBuffer(info.mime);
                this.sourceBuffer.mode = 'sequence';
                this.sourceBuffer.addEventListener('updateend', this.load.bind(this));
            }
        });

        this.MP4BoxFile.onError = (() => {
            this.destroy();
        });
    }

    stop() {
        if (this.ws) {
            this.ws.close();
            this.ws.onopen = null;
            this.ws.onmessage = null;
            this.ws.onclose = null;
            this.ws = undefined;
        }

        if (this.MP4BoxFile) {
            this.MP4BoxFile.stop();
        }

        if (this.sourceBuffer) {
            this.sourceBuffer.removeEventListener('updateend', this.load.bind(this));
            this.mediaSource.removeSourceBuffer(this.sourceBuffer);
            this.sourceBuffer = undefined;
        }

        this.streaming = false;
    }

    destroy() {
        // this.stop();
        // this.ele.src = '';
        // this.ele = null;
        // this.url = '';
        // this.mediaSource = null;
        // this.MP4BoxFile = null;
        // this.ws = null;
        // this.mime = '';
        // this.streaming = false;
        // this.connectionTimes = 0;
        // this.sourceBuffer = null;
        // this.arrayBuffer = [];
        // this.seeked = false;
        // this.updateEndHandler = null;
    }
}

export default StreamH265Player;