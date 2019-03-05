#version 120

#define PI 3.141592

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec3 col = texture2DRect(inputTexture, uv * resolution).rgb;
    
    vec3 tc;
    tc.r = (col.r * .393) + (col.g *.769) + (col.b * .189);
    tc.g = (col.r * .349) + (col.g *.686) + (col.b * .168);
    tc.b = (col.r * .272) + (col.g *.534) + (col.b * .131);

    gl_FragColor = vec4(tc, 1.0);
}
