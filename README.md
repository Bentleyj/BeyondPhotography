# BeyondPhotography
## The Digital Darkroom Practice

Reading Gerard J. Holzmann's book Beyond Photography and trying out the examples with openFrameworks

working with oF_0.9.7


### Day 0

Today I set up the framework for modifying images. I created a helper class called "Effect" whcih contains a shader and allows you to link up some uniforms to be passed to the shader. Easy Peasy! But there are definitely problems with my plan and I wish I had done things differently. I may ammend some stuff soon, like give myself more control over the uniforms.

### Day 1

My plan is to work through the book one image at a time. I started on page 17 with the simple new[x, y] = x + y function but of course it's never that simple! I had to do modulo arithmetic to make it look like the image in the book because in GLSL v120 float values do not wrap around naturally.

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
