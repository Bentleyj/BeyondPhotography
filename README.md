# BeyondPhotography
## The Digital Darkroom Practice

Reading Gerard J. Holzmann's book Beyond Photography and trying out the examples with openFrameworks

working with oF_0.9.7

#### Required Addons

ofxGui - comes with oF

[ofxNestedFileLoader](https://github.com/Bentleyj/ofxNestedFileLoader_)


### Day 0

Today I set up the framework for modifying images. I created a helper class called "Effect" which contains a shader and allows you to link up some uniforms to be passed to the shader. Easy Peasy! But there are definitely problems with my plan and I wish I had done things differently. I may ammend some stuff soon, like give myself more control over the uniforms.

### Day 1

My plan is to work through the book one image at a time. I started on page 17 with the simple new[x, y] = x + y function but of course it's never that simple! I had to do modulo arithmetic to make it look like the image in the book because in GLSL v120 float values do not wrap around by default.

I finished image 3.1, and image 3.4 (I skipped 3.2 and 3.3)

### Day 2

Headed over to page 19 and re-did my previous modulo math.  was originally casting my floats to ints and then subracting them to get the decimal part of the number which works if you're doing modulo 1. Here I discovered the built-in mod(x, y) function in GLSL so that certainly saved some annoying calculation!

I completed image 3.5 and 3.6 using trigonometric functions. I should really make sure I remember to use the regularly. There is such cool stuff you can do with them!

### Day 3

Short day today. Added two conditionals, image 3.9 and 3.10. Lots of fun! Had to work out my scale and learned that you can do inline conditionals in GLSL. Who knew! I also did image 3.11 using polar coordinates.

### Day 4

So far a short day. I used modulo arithmetic to create the image 3.12 as well as using polar coordinates. The results are really cool if you use very low spiral thicknesses because you get what I'm going to call "pixel interference" which gives you these mad fractal-like patterns.

### Day 5

Long break between day 4 and day 5! I started looking at my first image manipulations today looking at 3.13, 3.15 and 3.16. I attempted 3.14 but all I got was blackness? Need to go back and look over this algorithm. But the solarization stuff looks really cool! super simple effect which can be really interesting using the parameter for the threshold. I also looked at 3.17 and 3.18 sharpen and blur effects.

### Day 6

Looked today at some more image transforms. I started with 3.19 and did 3.21 and 3.22. 3.22 was especialy interesting because I was using a non-square image so I had to re-normalize the x coordinate so as not to stretch the image. I achieved this by multiplying the x component by resolution.y/resolution.x to put it in the right scale which seems to have worked. If you instead renormalize the y is also undistorts it but it gets cropped (because my image is taller than it is wide). In general we will be re-normalizing the y coordinate because most images and screens are wider than they are tall.

### Day 7

Today we did stretching and shrinking of images. We did 3.23 (x Stretch), 3.25 (shrinking + tiling), 3.27 and 3.28 (mirroring). Also did my first two image piece 3.29 which had be belnding the girl with the pearl earing with the Mona Lisa. I want to try getting images that have the eyes in the same place (will probably need to photoshop something). I also remembered how annoying remembering the mod() function was but happily also learned how to type cast in GLSL. you use int(value) instead of (int)value which actually makes lots more sense.

### Day 8

Today we looked more closely at blending images. I completed 3.30 a linear blend along the X axis from one image to another and also 3.31 which shows a linear blend that starts at 0.333 and goes to 0.666. To achieve this effect I wronte a small "map" function which linearly remaps the values from one range to another. Something seems a bit funky with it though but it might just be the images I've chosen. Need to go back and have a look at it!

### Day [9]

Today I fixed the Blend center effect from 3.31. There was a bug with my mapping code which made it not map properly and resulted in a line in the image. I also did 3.33 an effect whcihb uses the brightness of one image as a conditional for the blend percentage. I also did this smoothly on my own (not in the book). Finall I did 3.34 which is an awesome images and warps the image with a wonky sin curve wobble!

### Day 10

Today I started on Chapter 4 with page 34 - 37. The first effect I added was the cone effect which makes the image look as if it's been projected on to a cone. To do this I had to refer back to my old atan effect from the beginning to remember how to ranslate the coordinates. I also wrote two helper functions to convert between polar and cartesian coordinates which was a lifesaver! For the next effect I built the shear effect but this one is a bit tricky to do in a shader because the effect in the book describes the image as being offset by a random amount but no more than 1 pixel beyond the last column/row. This is of course a bit tricky in a parallel processed GLSL shader so I cheated and users perlin noise to create a continuous pseudo-random variable. I'm going to come back to this and see if I can think up an algorithm for a more random random variable. Off the top of my head I believe this certainly can be done, maybe with Perlin noise as a base! For now I just played with the parameters of the noise until I got something theta resembled the image on page 37.

### Day 11

Just one image today as I'm quite busy at work at the moment. But today's image is a very special one because it's the Bentley Effect from pages 40 and 41! basically you just shift the pixels of the image down based on their brightness. I also tried with shifting the image up based on brightness and you get a really freaky effect! Big fan of this one!

OK I had to do another image today because I came up with a cool idea. I did the Bentley effect but offset the pixels in a random direction instead of doing it in the negative or positive y. This makes a really wonky fuzzy effect which highlights the bright parts of the image. Very cool! Also I've started taking screenshots of my progress and posting them [here](https://hellicarstudio.com/beyond-photography/). I want to document my screenshot command line prompt so that I can use it more easily so I'll put it here: `date=$(date '+%Y%m%dT%H%M%S'); screencapture -x -R0,127,712,626 ~/Desktop/screen_${date}.png`
