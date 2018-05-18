#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float map(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

float slant(vec2 uv, float minimum, float maximum, float height) {
    if(uv.x < minimum || uv.x > maximum) {
        return 0.0;
    }
    float middle = (minimum + (maximum - minimum) / 2.0);
    if(uv.x <= middle) {
        return map(uv.x, minimum, middle, -height, height) * map(abs(uv.y - 0.5), 0.0, 0.5, 1.0, 0.0);//abs(uv.y - 0.5);//map(uv.x, 0.0, peakXLocation, 0.0, peakHeight) * map(abs(uv.y - 0.5), 0.0, 0.5, 1.0, 0.0);
     } else {
        return map(uv.x, middle, maximum, height, -height) * map(abs(uv.y - 0.5), 0.0, 0.5, 1.0, 0.0);//abs(uv.y - 0.5);//map(uv.x, 0.0, peakXLocation, 0.0, peakHeight) * map(abs(uv.y - 0.5), 0.0, 0.5, 1.0, 0.0);
     }
}

void main() {
    
    // Find the Position of my pixel
    vec2 uv = gl_FragCoord.xy / resolution;
    
    // Flip the position upside-down (because computers suck and bring in texture flipped)
    uv.y = 1.0 - uv.y;

    float width = 0.01;

    for(int i = 0; i < 1.0 / width; i++) {
        uv.y += slant(uv, i*width, (i+1)*width, 0.01);
    }

    // for(int i = 0; i < 1.0 / width; i++) {
    //     uv.y += slant(uv, width*i, width*(i+1), 0.5);
    // }

    // given where my pixel is, find what color I shoul be from GWPE
    vec3 tc = texture2DRect(inputTexture, uv * resolution).rgb;

    // Display that color on screen
    gl_FragColor = vec4(tc, 1.0);
}