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

# Installation

https://www.renevolution.com/ffmpeg/2013/03/16/how-to-install-ffmpeg-on-mac-os-x.html
```
$ brew install ffmpeg --with-fdk-aac --with-ffplay --with-freetype --with-frei0r \
                      --with-libass --with-libvo-aacenc --with-libvorbis --with-libvpx \
                      --with-opencore-amr --with-openjpeg --with-opus --with-rtmpdump \
                      --with-schroedinger --with-speex --with-theora --with-tools
```

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

# Testing

* Run python server

https://stackoverflow.com/questions/21956683/enable-access-control-on-simple-http-server

```Python
#!/usr/bin/env python
try:
    # Python 3
    from http.server import HTTPServer, SimpleHTTPRequestHandler, test as test_orig
    import sys
    def test (*args):
        test_orig(*args, port=int(sys.argv[1]) if len(sys.argv) > 1 else 8000)
except ImportError: # Python 2
    from BaseHTTPServer import HTTPServer, test
    from SimpleHTTPServer import SimpleHTTPRequestHandler

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    test(CORSRequestHandler, HTTPServer)
```

run server under CORS

```
$ python PythonServer.py 
```

* create html file

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
       <video data-dashjs-player autoplay src="http://localhost:8000/stream/WhatIsThisThingCalledLove/.mpd" controls></video>
   </div>
</body>
</html>
```

## AWS CLI

copying a folder

```
$ aws s3 cp --recursive stream s3://theindie-stream-dev/stream
```

deleting a folder

```
$ aws s3 rm --recursive s3://theindie-stream-dev/stream
```


# Install

https://medium.com/coconut-stories/using-ffmpeg-with-docker-94523547f35c

```
$ alias ffmpeg='docker run -v=`pwd`:/tmp/ffmpeg opencoconut/ffmpeg'
```

```
$ ffmpeg 
```
#

@ MP4Box -dash create HLS m3u8 for fragmented MP4 

https://github.com/gpac/gpac/issues/772
