#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    // Find the Position of my pixel
    vec2 uv = gl_FragCoord.xy / resolution;
    
    // Flip the position upside-down 
    uv.y = 1.0 - uv.y;

    // given where my pixel is, find what color I shoul be from GWPE
    vec3 tc = texture2DRect(inputTexture, uv * resolution).rgb;

    tc.r = (tc.r < 0.5) ? 1.0 - tc.r : tc.r;
    tc.g = (tc.g < 0.5) ? 1.0 - tc.g : tc.g;
    tc.b = (tc.b < 0.5) ? 1.0 - tc.b : tc.b;

    gl_FragColor = vec4(tc, 1.0);
}