#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    //float dx = 20;
    //float dy = 20;
    //vec2 coord = vec2(dx*floor(uv.x/dx), dy*floor(uv.y/dy));
    //vec3 tc = texture2DRect(inputTexture, coord).rgb;
    gl_FragColor = vec4(uv, 1.0, 1.0);
}
