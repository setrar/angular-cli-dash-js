import {Component, OnInit, ViewChild} from '@angular/core';

import * as dashjs from 'dashjs';
import {MediaPlayerClass} from 'dashjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  videoSource = 'http://media.crave.fm:1935/vod/mp4:WhatIsThisThingCalledLove.mp4/manifest.mpd';

  @ViewChild('videoPlayer') myVideo: any;

  player: MediaPlayerClass;

  ngOnInit() {
    this.player = dashjs.MediaPlayer().create();

    this.player.getDebug().setLogToBrowserConsole(true);
    console.log(' Init! ');

    // this.player.initialize();
    // this.player.attachView(this.myVideo.nativeElement);
    this.player.initialize(this.myVideo.nativeElement, this.videoSource, true);
    // this.player.attachSource(this.url);

    // this.player.attachVideoContainer(this.myVideo);

    // this.player.initialize(this.myVideo, this.url, true);
    // this.player.play();
  }

  toggleVideo(event: any) {

    console.log(' hit! ');
    // this.player.initialize(this.myVideo.nativeElement, this.videoSource, true);
    // this.player.attachView(this.myVideo.nativeElement);
    // this.player.attachVideoContainer(this.myVideo);
    // this.myVideo.nativeElement.stop();
    this.player.play();
  }

}
