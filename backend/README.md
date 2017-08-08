# MPEG-DASH

## What is it?

DASH is an adaptive bitrate streaming technology where a multimedia file is partitioned into one or more segments and delivered to a client using HTTP.

## Content

### What

http://content.wow.com/wiki/MPEG_DASH

### How?



https://bitmovin.com/mp4box-dash-content-generation-x264/

ffmpeg

https://trac.ffmpeg.org/wiki/Encode/H.264

# Conversion

## from mp3 to mp4 using a fixed image
```
$ ffmpeg -loop 1  \
         -i ImageMP3.png -i WhatIsThisThingCalledLove.mp3 \
         -c:a copy -c:v libx264 \
         -shortest video_audio.mp4
```
or

```
$ ffmpeg -loop 1 \
         -i ImageMP3.png -i WhatIsThisThingCalledLove.mp3 \
         -c:v libx264 -c:a aac -b:a 192k \
         -shortest video_audio.mp4
```

*** Skipped not working

-------

```
$ x264 --output intermediate_2400k.264 \
     --fps 24 --preset slow --bitrate 2400 \
     --vbv-maxrate 4800 --vbv-bufsize 9600 \
     --min-keyint 48 --keyint 48 \
     --scenecut 0 --no-scenecut \
     --pass 1 --video-filter "resize:width=1280,height=720" video_audio.mp4
```

```
$ MP4Box -add intermediate_2400k.264 -fps 24 output_2400k.mp4
```

-------

```
$ MP4Box -add video_audio.mp4 -fps 24 output_2400k.mp4
```


```
$ MP4Box -dash 4000 -frag 4000 -rap -segment-name segment_ output_2400k.mp4
```

```
$ MP4Box -dash 4000 -frag 4000 -rap \
         -segment-name segment_ resources/mp4/output_2400k.mp4#audio 
         -out stream/mysong.mpd
```
## Ref

on Mac: (install Osmo4)

/Applications/Osmo4.app/Contents/MacOS/

Player.html
```html
<html>
<head>
<script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>
<style>
    video {
       width: 640px;
       height: 380px;
    }
</style>
<head>
<body>
   <div>
       <video data-dashjs-player autoplay src="http://localhost:8000/stream/WhatIsThisThingCalledLove.mpd" controls></video>
   </div>
</body>
</html>
```
