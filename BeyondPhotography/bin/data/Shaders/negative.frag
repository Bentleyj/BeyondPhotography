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
    tc = vec3(1.0) - tc;
    gl_FragColor = vec4(tc, 1.0);
}
