#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float map(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

void main() {
    
    // Find the Position of my pixel
    vec2 uv = gl_FragCoord.xy / resolution;
    
    // Flip the position upside-down (because computers suck and bring in texture flipped)
    uv.y = 1.0 - uv.y;

    float peakHeight = 0.2;

    float peakXLocation = 0.5;

     if(uv.x < peakXLocation){
        uv.y += map(uv.x, 0.0, 0.5, -peakHeight, peakHeight) * map(abs(uv.y - 0.5), 0.0, 0.5, 1.0, 0.0);//abs(uv.y - 0.5);//map(uv.x, 0.0, peakXLocation, 0.0, peakHeight) * map(abs(uv.y - 0.5), 0.0, 0.5, 1.0, 0.0);
     } else {
        uv.y += map(uv.x, 0.5, 1.0, peakHeight, -peakHeight) * map(abs(uv.y - 0.5), 0.0, 0.5, 1.0, 0.0);//abs(uv.y - 0.5);//map(uv.x, 0.0, peakXLocation, 0.0, peakHeight) * map(abs(uv.y - 0.5), 0.0, 0.5, 1.0, 0.0);
     }
    // else
        // uv.y += map(uv.x, peakXLocation, 1.0, peakHeight, 0.0) * map(abs(uv.y - 0.5), 0.0, 0.5, 1.0, 0.0);

    // uv.y -= peakXLocation / 2.0;

    // given where my pixel is, find what color I shoul be from GWPE
    vec3 tc = texture2DRect(inputTexture, uv * resolution).rgb;
    // vec3 tc1 = texture2DRect(inputTexture, uv * resolution).brg;
    // vec3 tc2 = texture2DRect(inputTexture, uv * resolution).rgb;

    // Display that color on screen
    gl_FragColor = vec4(tc, 1.0);
}