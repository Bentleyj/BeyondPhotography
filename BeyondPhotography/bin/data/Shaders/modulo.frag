#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution * 10;
    
    uv.y = 1.0 - uv.y;

    float b = mod(uv.x, uv.y);
    
    b = mod(b, 1.0);

    gl_FragColor = vec4(vec3(b), 1.0);
}
