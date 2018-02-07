#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    float y = 1.0 - uv.x;
    float x = uv.y;
    
    //uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = vec2(x, y) * resolution;
    uvAbs.x *= resolution.y / resolution.x;
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}
