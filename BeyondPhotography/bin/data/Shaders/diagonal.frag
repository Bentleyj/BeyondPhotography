#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution * 10;
    
    uv.y = 1.0 - uv.y;
    
    float b = uv.x + uv.y;
    
    b = mod(b, 1.0);
    
    //float dx = 20;
    //float dy = 20;
    //vec2 coord = vec2(dx*floor(uv.x/dx), dy*floor(uv.y/dy));
    //vec3 tc = texture2DRect(inputTexture, uv * resolution).rgb;
    gl_FragColor = vec4(vec3(b), 1.0);
}
