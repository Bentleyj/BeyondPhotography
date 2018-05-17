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

    vec2 uvAbs = uv * resolution;

    float col = mod((uvAbs.x/resolution.x*10.0), 1.0) * mod((uvAbs.y/resolution.y*10.0), 1.0);

    // given where my pixel is, find what color I shoul be from GWPE
    vec3 tc = texture2DRect(inputTexture, uv * resolution).rgb;

    tc *= col;
    tc.r = mod(tc.r, 1.0);
    tc.g = mod(tc.g, 1.0);
    tc.b = mod(tc.b, 1.0);


    // Display that color on screen
    gl_FragColor = vec4(tc, 1.0);
}