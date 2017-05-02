import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import * as dashjs from 'dashjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app works!';

  url = 'http://media.crave.fm:1935/vod/mp4:WhatIsThisThingCalledLove.mp4/manifest.mpd';

  @ViewChild('videoPlayer') myVideo: any;

  player: any;

  ngOnInit() {
    this.player = dashjs.MediaPlayer().create();
    this.player.initialize();
    this.player.initialize(this.myVideo, this.url, true);
  }

  ngAfterViewInit() {
    this.player.reset();
    this.player.attachView(this.myVideo);
    this.player.attachSource(this.url);
    this.player.play();
  }

}
