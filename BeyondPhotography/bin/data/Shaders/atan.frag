#version 120

#define PI 3.141592

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    //uv.y = 1.0 - uv.y;
    
    float b = atan(uv.y - 0.5, uv.x - 0.5) / PI/2;
    
    b = mod(b, 1.0);
    
    //float dx = 20;
    //float dy = 20;
    //vec2 coord = vec2(dx*floor(uv.x/dx), dy*floor(uv.y/dy));
    //vec3 tc = texture2DRect(inputTexture, uv * resolution).rgb;
    gl_FragColor = vec4(vec3(b), 1.0);
}
