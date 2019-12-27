---
layout: post
title: Turning Sketches into Stickers
published: true
---

## Prologue

Last week, a friend of mine sent me sketches so I could turn them into vinyl cut stickers. While it is fairly easy to turn clean scans into stickers (e.g. Import Bitmap into Roland CutStudio, Trace Outline, Cut), these were dark cellphone pictures that evaded any attempt of cleanly tracing the outlines let alone in a design that would be suitable for stickers. However, after some fiddling, I was able to create enough contrast in the image to get a workable trace in Inkscape. I edited this new vector file to my liking and then had a sharp image to send to CutStudio for outlining and cutting.

## Steps

The images I received were as seen below.
![FlowerSketch.jpeg]({{site.baseurl}}/images/Vinyl/FlowerSketch.jpeg =250px)
![CircleSketch.jpeg]({{site.baseurl}}/images/Vinyl/CircleSketch.jpeg =250px)

Early tracing attempts were not just rough around the edges, but they traced the shadows and the dark spots on the paper as well. To remedy this, I first opened the images in ColorSync Utility and turned Gamma all the way down, Saturation all the way down, and Contrast all the way up. This resulted in the following images to be cropped and rotated.
![ColorFlower.jpeg]({{site.baseurl}}/images/Vinyl/ColorFlower.jpeg =250px)
![ColorCircle.jpeg]({{site.baseurl}}/images/Vinyl/ColorCircle.jpeg =250px)

I then imported these updated images into Inkscape and did Path > Trace Bitmap using Brightness Cutoff and turning the Threshold up to 0.6 to get a stronger line. This results in an editable path being drawn on top of the image file. To start cleaning up, you can select and delete the original imported image to see what the vector image itself looks like (try clicking a bit of white space to select the image to be sure you don't accidentally click on the path and delete it).

As in my case, the vector drawing may not seem as clean as you would like. To further clean the drawing up, select Path > Simplify and Inkscape will remove some nodes from the path to clean up the lines and smooth out the drawing. This can be completed multiple times--too much simplifying can result in an abstract work and too little can leave too many nodes to easily work with during manual cleanup. After one simplify operation, my drawing looks like this.

![Simplify1.png]({{site.baseurl}}/images/Vinyl/Simplify1.png =250px)


