#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    //float dx = 20;
    //float dy = 20;
    //vec2 coord = vec2(dx*floor(uv.x/dx), dy*floor(uv.y/dy));
    vec3 tc = texture2DRect(inputTexture, uv * resolution).rgb;
    vec3 tn;
    tn.r = (tc.r < 0.5) ? 1.0 - tc.r : tc.r;
    tn.g = (tc.g < 0.5) ? 1.0 - tc.g : tc.g;
    tn.b = (tc.b < 0.5) ? 1.0 - tc.b : tc.b;
    
    tc = mix(tc, tn, uv.x);
    

    gl_FragColor = vec4(tc, 1.0);
}