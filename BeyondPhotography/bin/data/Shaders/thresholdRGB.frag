#version 120

#define PI 3.1415926
#define NUM_TILES 130

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
        
    vec2 uvAbs = uv * resolution;

    float thresh = 0.5;

    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;

    if(tc.r < thresh) {
        tc.r = 0;
    } else {
        tc.r = 1;
    }
    if(tc.g < thresh) {
        tc.g = 0;
    } else {
        tc.g = 1;
    }    
    if(tc.b < thresh) {
        tc.b = 0;
    } else {
        tc.b = 1;
    }
    
    gl_FragColor = vec4(tc, 1.0);
}

