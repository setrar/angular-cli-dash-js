#!/bin/bash

STREAM_FOLDER=stream; rm -rf $STREAM_FOLDER; mkdir $STREAM_FOLDER

OUTPUT_FOLDER=output; rm -rf $OUTPUT_FOLDER; mkdir $OUTPUT_FOLDER

SONG=WhatIsThisThingCalledLove

PLAYLIST=jazz

ffmpeg -loop 1 -i resources/img/ImageMP3.png -i resources/mp3/$SONG.mp3  -c:v libx264 -c:a aac -b:a 128k  -shortest $OUTPUT_FOLDER/$SONG.mp4

MP4Box -add $OUTPUT_FOLDER/$SONG.mp4 -fps 24 $OUTPUT_FOLDER/$PLAYLIST.mp4

MP4Box -dash 4000 -frag 4000 -rap -segment-name segment_ $OUTPUT_FOLDER/$PLAYLIST.mp4#audio -out $STREAM_FOLDER/$PLAYLIST.mpd

rm -rf $OUTPUT_FOLDER
