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

Short day today. Added two conditionals, image 3.9 and 3.10. Lots of fun! Had to work out my scale and learned that you can do inline conditionals in GLSL. Who knew!
