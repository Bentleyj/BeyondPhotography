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

I completed image 3.5 and 3.6 using trigonometric functions. I should really make sure I remember to use them regularly. There is such cool stuff you can do with them!

### Day 3

Short day today. Added two conditionals, image 3.9 and 3.10. Lots of fun! Had to work out my scale and learned that you can do inline conditionals in GLSL. Who knew!? I also did image 3.11 using polar coordinates.

### Day 4

So far a short day. I used modulo arithmetic to create the image 3.12 as well as using polar coordinates. The results are really cool if you use very low spiral thicknesses because you get what I'm going to call "pixel interference" which gives you these mad fractal-like patterns.

### Day 5

Long break between day 4 and day 5! I started looking at my first image manipulations today looking at 3.13, 3.15 and 3.16. I attempted 3.14 but all I got was blackness? Need to go back and look over this algorithm. But the solarization stuff looks really cool! Super simple effect which can be really interesting using the parameter for the threshold. I also looked at 3.17 and 3.18 sharpen and blur effects.

### Day 6

Looked today at some more image transforms. I started with 3.19 and did 3.21 and 3.22. 3.22 was especialy interesting because I was using a non-square image so I had to re-normalize the x coordinate so as not to stretch the image. I achieved this by multiplying the x component by resolution.y/resolution.x to put it in the right scale which seems to have worked. If you instead renormalize the y is also undistorts it but it gets cropped (because my image is taller than it is wide). In general we will be re-normalizing the y coordinate because most images and screens are wider than they are tall.

### Day 7

Today we did stretching and shrinking of images. We did 3.23 (x Stretch), 3.25 (shrinking + tiling), 3.27 and 3.28 (mirroring). Also did my first two image piece 3.29 which had be belnding the girl with the pearl earing with the Mona Lisa. I want to try getting images that have the eyes in the same place (will probably need to photoshop something). I also remembered how annoying remembering the mod() function was but happily also learned how to type cast in GLSL. you use int(value) instead of (int)value which actually makes lots more sense.

### Day 8

Today we looked more closely at blending images. I completed 3.30 a linear blend along the X axis from one image to another and also 3.31 which shows a linear blend that starts at 0.333 and goes to 0.666. To achieve this effect I wronte a small "map" function which linearly remaps the values from one range to another. Something seems a bit funky with it though but it might just be the images I've chosen. Need to go back and have a look at it!

### Day [9]

Today I fixed the Blend center effect from 3.31. There was a bug with my mapping code which made it not map properly and resulted in a line in the image. I also did 3.33 an effect which uses the brightness of one image as a conditional for the blend percentage. I also did this smoothly on my own (not in the book). Finally I did 3.34 which is an awesome images and warps the image with a wonky sin curve wobble!

### Day 10

Today I started on Chapter 4 with page 34 - 37. The first effect I added was the cone effect which makes the image look as if it's been projected on to a cone. To do this I had to refer back to my old atan effect from the beginning to remember how to ranslate the coordinates. I also wrote two helper functions to convert between polar and cartesian coordinates which was a lifesaver! For the next effect I built the shear effect but this one is a bit tricky to do in a shader because the effect in the book describes the image as being offset by a random amount but no more than 1 pixel beyond the last column/row. This is of course a bit tricky in a parallel processed GLSL shader so I cheated and users perlin noise to create a continuous pseudo-random variable. I'm going to come back to this and see if I can think up an algorithm for a more random random variable. Off the top of my head I believe this certainly can be done, maybe with Perlin noise as a base! For now I just played with the parameters of the noise until I got something theta resembled the image on page 37.

### Day 11

Just one image today as I'm quite busy at work at the moment. But today's image is a very special one because it's the Bentley Effect from pages 40 and 41! basically you just shift the pixels of the image down based on their brightness. I also tried with shifting the image up based on brightness and you get a really freaky effect! Big fan of this one!

OK I had to do another image today because I came up with a cool idea. I did the Bentley effect but offset the pixels in a random direction instead of doing it in the negative or positive y. This makes a really wonky fuzzy effect which highlights the bright parts of the image. Very cool! Also I've started taking screenshots of my progress and posting them [here](https://hellicarstudio.com/beyond-photography/). I want to document my screenshot command line prompt so that I can use it more easily so I'll put it here: `date=$(date '+%Y%m%dT%H%M%S'); screencapture -x -R0,127,712,626 ~/Desktop/BeyondPhotographyEffects/screen_${date}.png`

### Day 12

Today I tackled three images (yay!) from page 42, 43 and one of my own invension. Firsltyu I did the melting effect on page 43 which I generated mostly by cheating but still got a really nice effect! Then I set about building the IBM logo creator on page 42 which turned out really nicely. I also made a cool splitting one along the way when testing the IBM logo piece. Loads of fun!

### Day 13

Today I did just one simple effect because we're busy at work. Did the swirl effect from pages 44 and 45. I could get some really fun effects and this is an example of a really basic but effective "trigonometric" effect.

### Day 14

Today I tackled the Oil painting effect from page 46 and 47. I think this one has come off really really well. I almost gave uop on it at first because I thought it would be too complicated but instead of giving up I persevered and ended up recreating the effect with my own histogram algorithm. My algorithm may not be perfect but I think it's pretty clear. Unfortunately at the moment it only works efficiently with a Black and White image. I would have to create a much large 3D histogram for all the colors which I think would be extremely inefficient. Black and white will have to do for now!

### Day 15

Today I tackled a much simpler effect than the day before. This involved projecting the polar coordinates of the image directly in to the cartesian plane. Instead of converting them correctly you just scale them directly in to the range which gives this weird effect which looks a lot like those images which you put a cylinder in the middle of and see an undistorted image. This is why I've called it CylinderProj, however I haven't actually tested it so I might just be dead wrong, but my gut tells me this is what would happen. I had a funny learning today which is that the value output by my CartToPol function for Theta is not a value between 0 and 2PI as I would have expected but instead a value between -PI and PI. This seems to me to be quite odd and I will need to investigate further to see whether my thinking or my algorithm is incorrect.

### Day 16

Had a cold so took a short break. Came back to work today to do the block shift image from pages 50 and 51. This was a fun effect which actually took me a little white to get right. Basically I had to shift blocks of pixels by equal amounts without actually knowing what block they were in. Because I'm using glsl I can't keep track of things like how many shifts I've already done between pixels. To solve this I started by using a thresholded noise function to create the blocks to shift in the X and the Y. Then I took each pixel and determined which block it was in, then stepped backwards through the image until I found the next pixel that was outside of the block and used that pixel to seed the random shift for the block. This way I got a really nice random block shift effect.

### Day 17

Today I looked at the warp effect of warping the x values of one image by another which makes some super crazy effects. Using figurative images gets really creepy looking faces and things. I want to try plugging in a pair of cameras snd having one warp the other in real-time. That would be sick!

### Day 18

Today I did the effect from page 54 and 55 whcih looks liek a psychedelic effect. This would have been a really easy effect to reproduce but for me it wasn't! Why? because GLSL v1.20 doesn't have support for bitwise operators! So I had to write my own. What joy! Actually I did manage to learn a lot about bitwise operators which was brilliant and about binary to decimal conversion etc. so this was a really educational one. The final effect I ended up with I'm not a huge fan of but some of the intermediate effects along the way I think came out really nicely. so I'm putting them all up online (I even made a commit of one of the earlier ones that I liked a lot and may spin it in to it's own effect soon!).

### Day 19

Really quick one today. I recreated the stretch effect on pages 56 and 57. This is basically a repeat of the sinStretch effect but split over X and Y. I did a bit of a cheat to get it as we are busy today but had some fiun playing around wit the parameters. Will probably revisit this one to do it properly one day!

### Day 20

Did two effects today from pages 58 and 59. This was actually a repeat of the effect I used to create the IBM logo effect. I started with that example and flipped it in y. I also did it as a spiral effect but this effect looked really lame with the image I chose. :(

### Day 21

Short one today as we are again very busy. I'm heading to NYC next week and so will need to take the week off from producing these most likely! Today I made a simple fisheye effect by squareing the radius in polar coordinates. I've actually used a similar effect to make our [Morph Mirror](https://github.com/Bentleyj/ofxNestedFileLoader_) project a while ago which uses a Kinect to do face tracking and then apply a fisheye effect to peoples faces that it finds.

### Day 22

Got to go on a trip to NYC for work so took some time off from this. Still busy with that same project so didn't have time to complete a full sketch today so I decided to work on image 15 from pages 62 and 63 and just see if I found anything cool. As luck would have it I managed to stumble upon something cool almost instantly and created a pixelation efect but with randomly sized pixels which looks very 8-bit. Remonds me of the art in this game A Song of Swords and Sworcery (or something like that, really fun game for iOS!). Anyway that's enough for today.!
