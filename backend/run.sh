#!/bin/bash

STREAM_FOLDER=stream; rm -rf $STREAM_FOLDER; mkdir $STREAM_FOLDER

OUTPUT_FOLDER=output; rm -rf $OUTPUT_FOLDER; mkdir $OUTPUT_FOLDER

SONGS=(
"WhatIsThisThingCalledLove"
"TIAr0000000196Al0000000001So0000006243"
) 

for SONG in "${SONGS[@]}"; do
   echo ${SONG} 
   mkdir $STREAM_FOLDER/${SONG}
   ffmpeg -loop 1 -i resources/img/ImageMP3.png -i resources/mp3/${SONG}.mp3  -c:v libx264 -c:a aac -b:a 128k  -shortest $OUTPUT_FOLDER/TMP_${SONG}.mp4
   MP4Box -add $OUTPUT_FOLDER/TMP_${SONG}.mp4 -fps 24 $OUTPUT_FOLDER/${SONG}.mp4
   MP4Box -dash 4000 -frag 4000 -rap -segment-name segment_ $OUTPUT_FOLDER/${SONG}.mp4#audio -out $STREAM_FOLDER/${SONG}/.mpd
done

#rm -rf $OUTPUT_FOLDER
