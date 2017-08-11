import {Component, OnInit, ViewChild} from '@angular/core';

import {MediaPlayerClass, MediaPlayer} from 'dashjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  // enabled CORS sources
  // videoSource = 'http://dash.edgesuite.net/envivio/EnvivioDash3/manifest.mpd';
  // videoSource = 'http://localhost:8000/stream/jazz.mpd';

  videoSource = '/stream/jazz/.mpd';

  @ViewChild('videoPlayer') myVideo: any;

  player: MediaPlayerClass;

  ngOnInit() {
    this.player = MediaPlayer().create();

    this.player.getDebug().setLogToBrowserConsole(true);
    console.log(' Init! ');

    this.player.initialize(this.myVideo.nativeElement, this.videoSource, false);

  }

  toggleVideo(event: any) {

    console.log(' ready? ' + this.player.isReady());
    console.log(' hit! ' + this.player.duration());

  }

}
