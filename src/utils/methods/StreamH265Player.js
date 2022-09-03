/**
 * H265播放方法
 * V0.1
 * @description 修复切换视频流后无法播放的问题
 */
import MP4Box from 'mp4box';

class StreamH265Player {
  /*******USER PARAMETERS*********/
  verbose = false;
  BUFFERING_SECOND = 1;
  BUFFERING_SECOND_SEEK = this.BUFFERING_SECOND * 0.9;
  BUFFERING_SECOND_SEEK_DISTANCE = this.BUFFERING_SECOND * 0.5;

  /*******INTERNAL PARAMETERS*********/
  mimeType = 'video/map4';
  codecs = '';
  codecParams = '';
  streamStarted = false;
  mediaSource = new MediaSource();// create media source instance
  mediaPacketsQueue = [];// queue for incoming media packets
  streamLiveDom = undefined;
  socketInstance = undefined;
  seeked = false;
  cc = 0;
  sourceBuffer = undefined;
  pass = 0;
  mp4BoxFile = undefined;
  domId = undefined;
  socketUrl = undefined;
  times = 0;

  /**********************EVENT HANDLER*****************************/
  mediaSourceOpenHandler = undefined;
  updateEndHandler = undefined;


  constructor(opt_options) {
    const options = opt_options || {};
    this.domId = options.id;
    this.socketUrl = options.url;
    if (options.dom) {
      this.streamLiveDom = options.dom;
    }
  }

  toInt(arr, index) {
    const dev = new DataView(arr.buffer, 0);
    return dev.getInt32(index, false);
  }

  toString(arr, fr, to) {
    return String.fromCharCode.apply(null, arr.slice(fr, to));
  }

  getBox(arr, i) {
    return [this.toInt(arr, i), this.toString(arr, i + 4, i + 8)];
  }

  getSubBox(arr, box_name) {
    let i = 0;
    let res = this.getBox(arr, i);
    let main_length = res[0];
    let name = res[1]; // this boxes length and name
    i = i + 8;
    let sub_box = null;

    while (i < main_length) {
      res = this.getBox(arr, i);
      let l = res[0];
      name = res[1];

      if (box_name === name) {
        sub_box = arr.slice(i, i + l);
      }
      i = i + l;
    }
    return sub_box;
  }

  hasFirstSampleFlag(arr) {
    let tRaf = this.getSubBox(arr, 'traf');
    if (tRaf === null) {
      return false;
    }

    let tRun = this.getSubBox(tRaf, 'trun');
    if (tRun === null) {
      return false;
    }

    let flags = tRun.slice(10, 13);
    const f = flags[1] & 4; // console.log(f);
    return f === 4;
  }

  _bindFunction(object, func) {
    return function () {
      func.apply(object, arguments);
    };
  }

  putPacket(arr) {
    if (!this.codecParams) {
      arr.fileStart = 0;
      this.mp4BoxFile.appendBuffer(arr);
    } else if (!this.streamStarted) {
      const top = this.mediaPacketsQueue.shift();
      if (top && this.sourceBuffer) {
        this.sourceBuffer.appendBuffer(top);
        this.streamStarted = true;
        this.cc = this.cc + 1;
      }
    }

    const memView = new Uint8Array(arr);
    if (this.verbose) {
      console.log('got', arr.byteLength, 'bytes.  Values=', memView[0], memView[1], memView[2], memView[3], memView[4]);
    }

    const res = this.getBox(memView, 0);
    const mainLength = res[0];
    const name = res[1];
    if ((name === 'ftyp') && (this.pass === 0)) {
      this.pass = this.pass + 1;
      console.log('got ftyp');
    } else if ((name === 'styp') && (this.pass === 1)) {
      this.pass = this.pass + 1;
      console.log('got styp');
    } else if ((name === 'styp') && (this.pass === 2)) {
      this.pass = this.pass + 1;
      console.log('got styp');
    } else if ((name === 'moov') && (this.pass === 1)) {
      this.pass = this.pass + 1;
      console.log('got moov');
    } else if ((name === 'moof') && (this.pass === 2)) {
      if (this.hasFirstSampleFlag(memView)) {
        this.pass = this.pass + 1;
        console.log('got that special moof');
      } else {
        return;
      }
    } else if (this.pass < 3) {
      return;
    }


    let latest = this.streamLiveDom.duration;
    if ((this.streamLiveDom.duration >= this.BUFFERING_SECOND) &&
      ((latest - this.streamLiveDom.currentTime) > this.BUFFERING_SECOND_SEEK)) {
      // console.log('seek from ', this.streamLiveDom.currentTime, ' to ', latest);
      const df = this.streamLiveDom.duration - this.streamLiveDom.currentTime; // this much away from the last available frame
      if ((df > this.BUFFERING_SECOND_SEEK)) {
        this.streamLiveDom.currentTime = this.streamLiveDom.duration - this.BUFFERING_SECOND_SEEK_DISTANCE;
      }
    }

    const data = arr;
    this.mediaPacketsQueue.push(data);
    if (this.verbose) {
      console.log('queue push:', this.mediaPacketsQueue.length);
    }
  }

  registerMp4BoxEvents() {
    console.log(this.mp4BoxFile);
    if (!this.mp4BoxFile) {
      return;
    }

    this.mp4BoxFile.onReady = (info) => {
      if (info.mime && MediaSource.isTypeSupported(info.mime)) {
        this.codecParams = info.mime;
        console.log(info);
        this.sourceBuffer = this.mediaSource.addSourceBuffer(this.codecParams);
        this.sourceBuffer.mode = 'sequence';
        this.updateEndHandler = this._bindFunction(this, this.loadPacket);
        this.sourceBuffer.addEventListener('updateend', this.updateEndHandler);
      }
    };

    this.mp4BoxFile.onError = (e) => {
      console.log('MP4 box parser error.' + e);
      this.destroy();
    };
  }

  loadPacket() {
    if (!this.sourceBuffer.updating) {
      if (this.mediaPacketsQueue.length > 0) {
        const inp = this.mediaPacketsQueue.shift();
        if (this.verbose) {
          console.log('queue push:', this.mediaPacketsQueue.length);
        }

        const memView = new Uint8Array(inp);
        if (this.verbose) {
          console.log(' ==> writing buffer with', memView[0], memView[1], memView[2], memView[3]);
        }
        this.sourceBuffer.appendBuffer(inp);
        this.cc = this.cc + 1;
      } else {
        this.streamStarted = false;
      }
    } else {
    }
  }

  onMediaSourceOpen() {
    this.mediaSource.duration = this.BUFFERING_SECOND;
    this._raisePlayerSocket();
  }

  _raisePlayerSocket() {
    if (!this.socketUrl) {
      return console.error('实时流地址为空');
    }
    this.socketInstance = new WebSocket(this.socketUrl);
    this.socketInstance.binaryType = 'arraybuffer';
    this.socketInstance.onmessage = (event) => {
      this.putPacket(event.data);
    };

    this.socketInstance.onerror = (e) => {
      console.log(e, 'error');
      this.socketInstance.close();
      this.mp4BoxFile.stop();
    };
    this.socketInstance.onopen = (e) => {
      console.log(e, 'open');
      this.times = 0;
    };

    this.socketInstance.onclose = (e) => {
      console.log(e, 'close');

      this.times++;
      console.log(this.times, 'iii');
      if (this.times <= 20) {
        this.interval = this.startToPlay(this.socketUrl);
      }
    };
  }

  startToPlay(url, dom) {
    this.destroy();

    if (url && typeof url === 'string') {
      this.socketUrl = url;
    }

    if (typeof dom === 'object') {
      this.streamLiveDom = dom;
    }

    if (typeof dom === 'string') {
      this.streamLiveDom = document.getElementById(dom);
    }

    if (!this.streamLiveDom && this.domId) {
      this.streamLiveDom = document.getElementById(this.domId);
    }
    this.mediaSource = new MediaSource();
    this.mediaSourceOpenHandler = this._bindFunction(this, this.onMediaSourceOpen);
    this.mediaSource.addEventListener('sourceopen', this.mediaSourceOpenHandler);
    this.mp4BoxFile = MP4Box.createFile();
    this.registerMp4BoxEvents();

    this.streamLiveDom.src = window.URL.createObjectURL(this.mediaSource);
  }

  destroy() {
    if (this.socketInstance) {
      this.socketInstance.onmessage = function () {

      };
      this.socketInstance.onclose = function () {

      };
      this.socketInstance.close();
      this.socketInstance = undefined;
    }

    if (this.mp4BoxFile) {
      this.mp4BoxFile.stop();
    }

    if (this.sourceBuffer) {
      this.updateEndHandler && this.sourceBuffer.removeEventListener('updateend', this.updateEndHandler);
      this.mediaSource.removeSourceBuffer(this.sourceBuffer);
      this.sourceBuffer = undefined;
    }

    this.mediaPacketsQueue = [];

    this.codecParams = '';
    this.streamStarted = false;
    if (this.streamLiveDom) {
      this.streamLiveDom.pause();
    }
  }
}

export default StreamH265Player;
