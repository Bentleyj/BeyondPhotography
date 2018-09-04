# BeyondPhotography
## The Digital Darkroom Practice

Reading Gerard J. Holzmann's book Beyond Photography and trying out the examples with openFrameworks

working with oF_0.9.7

#### Required Addons

ofxGui - comes with oF

[ofxNestedFileLoader](https://github.com/Bentleyj/ofxNestedFileLoader_)

#### Documentation

I am taking screenshots of my effects and putting them on instagram. I'm using the following command to take centered screenshots each time.

`date=$(date '+%Y%m%dT%H%M%S'); screencapture -x -R0,127,712,626 ~/Desktop/BeyondPhotographyEffects/screen_${date}.png`


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

OK I had to do another image today because I came up with a cool idea. I did the Bentley effect but offset the pixels in a random direction instead of doing it in the negative or positive y. This makes a really wonky fuzzy effect which highlights the bright parts of the image. Very cool! Also I've started taking screenshots of my progress and posting them [here](https://hellicarstudio.com/beyond-photography/).

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

Got to go on a trip to NYC for work so took some time off from this. Still busy with that same project so didn't have time to complete a full sketch today so I decided to work on image 15 from pages 62 and 63 and just see if I found anything cool. As luck would have it I managed to stumble upon something cool almost instantly and created a pixelation efect but with randomly sized pixels which looks very 8-bit. Reminds me of the art in this game A Song of Swords and Sworcery (or something like that, really fun game for iOS!). Anyway that's enough for today!

### Day 23

Still a short day as still busy. Modified the random pixelation to effect to be a regular pixelation effect! Quick and simple today!

### Day 24

Kind of a mistake effect today but I'm really pleased with the way it's come out. Really simple effect which creates quite a compelling result! Weave it up! I used a random shift  but in a pixelated kind of way and went for really straight up and down shifts. Still in pursuit of the tile explode effect. I think I have a good idea of how to proceed now which is awesome!

### Day 25

Getting much closer to my tile explode effect that I'm looking for! I figured out the best way to tile my image which is really exciting and I did it without using uniforms. The effect is just the color component of the effect in the cool at the moment and I have a hunch it will look even better in black and white. I have a plan for how to shift the tiles as well but that will need to be kept for next week!

### Day 26

Finally finished this effect (kind of). I've made it so that the pieces shift around but at the moment they are taken out of a random grid rather than out of a regular grid. I think I know how to build it but that will be for another day! Actually it won't be for another day, it's for today! I managed to achieve this by laying my squares out in the grid and then giving them random offsets. I still think this would look better in black and white than in RGB, or maybe with an image with less stark blacks in the background. But I'm quite pleased with the result today! I should note that these effects over the last few days would be sped up dramatically by using uniforms, however I kind of like the purity of doing all these effects within GLSL with as few uniforms as possible. 

I did another effect today I'm calling "color threshold" I think it could be fruitful to explore! basically I'm just thresholding different colors individually. I think it can be really effective.

### Day 27

Took a little break but now I'm back again. Today I I am finally moving on to the next effect in the book, the "Rubber Sheet" effect on pages 64 and 65. This should be a pretty straightforward effect but I got stopped on the way by a lovely random pixelation effect with different resolutions in x and y. Did perfect Y resolution today with randomly pixelated x resolution today. Tomorrow we'll try the other way around and see which is better!

### Day 28

Flipped it today to do the perfect resolution in X with randomly distributed pixels in X. I think I can make some really nice effects by playing around with this idea more, but I'm busy so that will have to wait until tomorrow!

### Day 29

Added a slanted pixelation effect today. Not what I really wanted to do today but I have no time! It is interesting to see, but I want to do more compicated pixelation patterns.

### Day 30

30 Days of 2D shaders! Today I'm trying to build a effect where the pixelation fades in over time. This is actually abit trickier than I thought and right now my pixels are all a weird size and her body seems to be in upside-down chunks but I'll figure it out tomorrow and resolve.

### Day 31

Today I finally got down to the nitty gritty and build the fading pixelation shader that I wanted to build! Very excited about it. I made one example where the pixelations fades in and then back out again. This is actually not the best image for it because it's so dark but I think you can still get the idea. I also learned a lot about how to do linear remapping from this [link](https://squircleart.github.io/math/value-remapping.html). Really great info! I want to use that much much more!

### Day 32

Went back to my old oil painting effect from day 14 because I posted it on instagram and got some feedback. I created kind of a weird version which works but also creates some funny colored edges around things. Quite cool actually!

### Day 33

Long break again due to work in NYC so I made a little test with pixelation fading in and out. Not sure happy with the results but I did learn a lot about how to manipulate sin curves in to an effect that I want. This one reminds me of Lego.

### Day 34

Starting to play with my wood texture (does that sound weird?). Getting some cool results already! I'm starting by offsettings the radius in polar coordinates by the brightness of the wood texture which gets some awesome looks! And I'm also spinning the pixels around the center by the amount of their brightness in the wood texture which is also quite groovy (wood pun?).

### Day 35

Started working on doing swirls without the wood texture and realized all my wood was up-side down because I had only flipped the texture AFTER calculating the uvAbs value. Have you go back and re-do the wood ones so I don't get confused later. I'm now applying the swirl a polar stretch effects to an image using its own texture which is a lot of fun!

### Day 36

Today I went back to basics with some really simple color effects. I did some simple swizzling to make a Shrek effect and cubed some values to make a nice darkened black and white effect. I was suprised how hard it was to create interesting looks with swizzling and I intend to think of something cooler to do with it because it is a really nice feature of GLSL.

### Day 37

Back to the book! Today I ended by excursion in to the realm of self-directed creation and went back to the Beyond Photography book to look at the Rubber Sheet effect on pages 64 and 65 (effect 16). I don't want to look at the interactivity of this effect but instead using just a static peak effect in the middle. I've built some variables we can easily adjust in it for now and I will look at extending this effect to have more slants at different angles. Also did a little extra effect today and added the 'Modulo Background' effect which I think could have a lot of promise is a lot of different ways.

### Day 38

Today I took apart the rough Peak effect I had made last time and turned it in to a contained a clean method which could be applied at different strengths over different intervals. This was really fun and allowed me to experiment a ton! I got 2 really nice effects which I've saved and a bunch more which I just took screenshots of simply by playing around with the width of the slant regions and amount of slant. My favorite effect is really zigzag x with really small interval width but large slant amounts!

### Day 39

Tackled another effect from the book today which proved beautifule as I knew it would. Today we did The Lincoln Transform which is a polar coordinates pixelation effect. To do this you first convert to polar coordinates, then do a pixelation in both radius and angle and finally convert back in to cartesian coordinates. Really neat effect!

### Day 40

Iterating further with the polar pixelation doing polar pixelated rings and stripes. I also decided that I wanted to remove the dependency on ofxNestedFileLoader because it was causing problems where my images were not loaded in any reasonable order so on multiple computers I needed to keep changing my settings. Now I've made the images fixed so they will always load. I'm also adding the images to the git repo so it's easier to redistribute.

### Day 41

Today I was inspired by my grandmother Nina Bentley who gifted me a lenticular (thanks Grandma!). A Lenticular is a way of preparing two images so that they alternate back and forth when you walk by them as described [here](https://en.wikipedia.org/wiki/Lenticular_printing_). Of course I wanted to try it here so I've started out by creating an image that is a lenticular of 2 images by using the mod method to alternate strips of the image one after the other. I want ultimately to be able to control the width of these strips.

### Day 42

Made the strips thicker and have variable thickness even. I thought this was going to be much trickier than it was but the mod function swooped in to save the day. Really digging what I can do with this effect.

### Day 43

Running out today so had very little time. Decided to try flipping the axis of my lenticular effect so now it's in the X direction. For some reason this is much less effective visually! Wouldn't have suspected that.

### Day 44

Created a checker effect today based on the lenticular work I had done before. It took me a little while to work out the logic but I finally sorted it. I'm not sure about this effect and I think I need to experiment with different step sizes to get somewthing interesting.

### Day 45

Today started out by looking at a checkered negative effect. This proved to look pretty crappy because there was so much contrast between the black and white backgrounds. Then I tried doing something with smoothsetp which created a really interesting effect. The effect is presently very glitchy but I think it looks cool and very bridget riley esque who of course I greatly enjoy so I'm rather pleased with it. For some reason it looks like my smoothstep is overflowing or underflowing I suspect whcih is causing the extreme colors. Actually I just did some research and I think the reason might be the following: Results are undefined if edge0 ≥ edge1. from the folloriwng [link](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/smoothstep.xhtml). Need to experiment.

### Day 46

Experimented today with creating more op-art effects but instead I ended up with something really quite groovy creating a sort of sin-city like effect. Looks like she is looking through a shuttered window with some bright lights outside of it and shadows are very stark. To do this I predominantly used a thresholding effect which I think I should experiment with much more!

### Day 47

Today I really wanted to experiment further with thsi Sin City look but I did not have much success. I realized what I liked about the last one was the thresholding so I wanted to threshold on a single color ie red, this would pick out the redest bits I thought to myself. I ended up being wrong and it picked out a lot of white bits too (obviously). I need to experiment with this more.

### Day 48

More or less a failed attempt at highlighting red parts of the image. I keep picking up yellows as well! booo. Will try again tomorrow.

### Day 49

Backing away from crazy colors I'm doing Sobel edge detection today. I repurposed an old shader that I used for a Cartoon Network project which was written in HLSL and converted it to GLSL. Standard find and replace stuff aside, the conversion had one tricky bit which was the return value from the sobel method. in HLSL I wanted to calculate the length of the sobel vector and so did: `vertical squared times horizontal squared square rooted` and that returned a float value. In GLSL I had to explicitly call `length(vertical + horizontal)` which is actually much better. I don't know how the HLSL one worked in the first place, Is there an implicit conversion from vec4 to the length of vec4 when casting a vec4 as a float in HLSL? I did some googling but couldn't work it out. Will need to investigate more. In the meantime I'm excited to have a new toy to play with and will experiment with that I can do with edge detection!

### Day 50

Day 50! what a milestone! I kept going with Sobel edge detection today and used the edges as a mask for the existing colors in the image. Will try the reverse mast tomorrow.

### Day 51

I did not try the reverse today but instead tried to use the edges as a pixelation effect and what success! I took each pixel and stepped to the right until I found a pixel that was  a sobel edge the sampled the color from that edge. It was really a futuristic result! I called it Sobel Stretch.

### Day 52

Continuing witht he sobel edge stretching I went ahead and applied the effect in both X and Y and then averaged the values. Actually I was slightly more clever than that as I only averaged the colors if neither color was black. If one was black I just selected the other color which made for a much brighter (but not blown out!) image.

### Day 53

Made the Sobel algorithm search in both directions which I think is a big improvement on the effect. Also did added a comment for up-down searching as well as side-to-side. I want to try just up-down alone next. I suspect it will look really cool! Also today I learned that in GLSL if statements only evaluate bool values not int values as bools. in C++ and C this is different: You can pass an int to an if statement and it will evaluate to true if the int is non-zero and false if it is zero. to get around this I did the obvious and just checked if the int returned by my function was equal to zero explicitly by writing `if(mod(i, 2) == 0)` instead of `if(mod(i, 2))` as I would in C or C++.

### Day 54

Tried just up and down alone which actually wasn't as interesting as I had hoped :-( . Perhaps Radial will be interesting?

### Day 55

Might try radial tomorrow but today I went back to colors! Can't help myself with these colors! I'm attached the sobel amount to a blend between negative and positive values. Quite cool if you jack the sobel up really high!

### Day 56

Added a Logarithmic Correction effect today which came out very weird. My problem is that my max brightness is 1.0 and I'm required to divide by the log of that value which, obviously, menas I'm dividing by 0 which isn't good! Kinda cool result in the end I guess!

### Day 57

Started doing some straight up drawing. Going to keep it simple at first by just doing a circle. I want to make more complex drawings soon! My plan is to build a up a lirary of shapes and then try to select interesting places to draw them. I'm using two smoothstep functions subreacted from one another to get this effect.

### Day 58

Adding a line drawing algorithm to draw a line between two points. I used the algorithm from [here](https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line) which was extremely helpful. I then added my own boolean checks because that algorithm works for an infinite line but I only wanted a line segment defined by two points. I then made an effect that merged the lines and the circles together for a cool design.

### Day 59

Added Hypno Target effect which makes a radial pixelation but instead of pixelating radially we swap between positive and negative images!

### Day 60

Today I took the Hypno Target and did a Hypno Fan instead which is the same logic but applied to the angle rather than the radius. At angular widths of around PI/4 you get stuff that looks a lot like the old japanese flag. At higher angle widths like PI you get stuff a lot closer to medieval heraldry and at really really small angle widths, like PI/100 you get some very abstract looks.

### Day 61

Today I went back to the sobel edge detection and looked at combining it with pixelation. The result is some really interesting effects. I will look at doing a more binary approach next time but I'm generally quite pleased with the look. Basically I pixelate the picture based on whether it's a sobel edge or not. So areas with low edges are more pixelated than parts with edges.

### Day 62

Bit more complicated today. I built a system that for each point calculates the average sobel level in a region around it and then uses that to determine how pixelated the point is. Worked out quite nicely when you play with the parameters. I got several very unique effects and took screenshots of all of them.

### Day 63

Simple one today, went back in to the hsvMix effect and added some comments around different cooky effects. I haven't documented which is which though so posts on IG will need to be a bit cryptic to hide my disorganization. Thanks to HackPoetic for inspiring me!

### Day 64

Tried doing the same pixelation effect I did before but with color rather than sobel edges. Got some cool results but I'm a bit confused by them. Probably worthwhile doing this with HSV values instead of RGB.

### Day 65

Went back to doing pixelation based on brightness but the effects I got erre pretty plain. Still not sure exactly what's wrong with my algorithm. I instead looked at doing arcs as pixels which turns out to look super super cool! Really pleased to be able to apply the drawing effects I developed to some image features in GLSL and get some interesting looks. Basically all I did was pixelate the image and use the pixelation sample pixels (ie the top left corner of each pixel from which the color for the rest of the pixel is sampled) as the center of an arc that goes through the circle. Plaing with different circle sizes and pixel grid sizes has proved very rewarding!

### Day 66

Doubled up on my circles today, this creates and interesting crochette effect. I also expanded this to make a really awesome circled effect which almost looks like an ordered Boche effect. Super pleased with todays work.

### Day 67

Back from summer vacation! Today I went back to the circle drawing effects but replaces the circles with lines to get a cool cross-hatching effect. Really digging these looks. I'm drawing a line between the top left and bottom right points of each pixel that is colored for the pixels. It creates a really cool natural looking cloth effect when the width of the lines is similar to the size of the pixels and a really cool grid-like effect when the line width is much smaller. I should make some more drawing functions.

### Day 68

Busy at work so short one today. I added an effect that crops a square of the image. most importantly I defined a function that determined whether a pixel is within a square or not. It's really simple but should allow me to make some fun effects. Just test if the X value is between two values and if the Y is also between two values and return 0 or 1.

### Day 69

Didn't actually make an effect today but instead attached the camera to the computer and made a system so you can switch between images and a live feed! It's really cool to play with these effects and animation!

### Day 70

Made the circles grid but with triangles instead. Also on the way there made some really nice line effects. I call this one Tirangle Grid. It's really pretty boring looking I think because the triangles don't overlap the same way the circled did (which I should probably look to build ASAP!). Got some reall nice line effects on the other hand which I'm pleased about and took some screenshots of. These can be achieved by pixelating the image and then drawing lines that lerp from the color of one corner of the pixel to the corner of the other. Really efficient algorithm and nice to look at.

### Day 71

Added Quad Smudge effect by taking the brightest of 4 pixels with a peritcular offset. Although very simple I actually think the effect gets some quite interesting results wiht step size around 40-50. I'm interested in sampling more points, and maybe doing it with the dark points as well.

### Day 72

Made my smudge effect into "Search Smudge" which searches the entire nearby square region to each pixel for the brightest pixel and replaces it with that one. At high search ranges (ie 40 pixels) it looks really abstract but runs very slowly. At lower pixel search ranges (ie 10) it runs fast but looks kind of boring. It gets really interesting effects around particularly bright bits like eyes etc.

### Day 73

Today I used the same search algorithm to find the two brightest points nearby each pixel and then draw a line between thoese two points. It's really interesting to draw lines like this because they are totally diffuse, IE you need multiple points to have the same "brightest" points in order to get the lines to show up. If you use a small enough search space you actually do get a fairly accurate representation of the image which makes some sense but is also interesting to me. Drawing lines like this where the endpoints are not defined continuously it really interesting.

### Day 74

Replicated the lines effect from yesterday but instead of using the brightest pixels I used the "most sobelly" pixels (ie the most edgy pixels). This created an interesting effect which looks a bit like a disolve but where the edges are clearly defined.

### Day 75

Jumped in to Shadertoy today and looked around for cool effects. Managed to find [this](https://www.shadertoy.com/view/Xlt3R7) by [roywig](https://www.shadertoy.com/user/roywig) and copied it pretty much verbatim. He calls it a Droste effect but I don't know what that means. He's got lots of cool effects like this so excited to learn more about them. It looks like M.C. Escher to me!

### Day 76

Starting to play around with this Droste effect. Turns out Droste refers to the dutch effect of putting an image within an image in an infinite loop. In face the name is based on Droste's Cacao which was a brand of Cacao from 1904 which featured a woman holding a tin of cacao which had the woman on it again, etc. etc. So this implementation that I got off of shadertoy is really just one example of it working well. I can imediately imagine a few other ways to make this effect. For now I've made "Droste2" where I'm just messing around with the effect I already have.

### Day 77 & 78

Inspired by some any Warhol paintings I have started trying to split up my image in to HSV chunks and then assigning them different flat colors. HSV comes out very pixelated though so I need to adjust accordingly (basically blur). Really cool effects when mixed with Sobel Edge Detection. I'm aiming for something like his "detail of a renaissance painting".

### Day 79

Tried some different colors for the warhol effect today and I also changed so the sobel effect so it wasn't additive. I'd like to create a system of "color priority" to mimic screen printing. This might be next time!

### Day 80

Decided to treat myself and do something mathematical today, specifically I'm looking at fractals and the mandelbrot set! I'm just created a method called mandelbrot and used it as a mask for the image (nothing special yet!) but I plan to do more exciting stuff with the mandelbrot set soon!
