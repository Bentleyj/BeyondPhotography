#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float length(vec3 v) {
    return (v.x + v.y + v.z) / 3.0;
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;

    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    
    uvAbs.y += length(tc) * 100.0;
    
    tc = texture2DRect(inputTexture, uvAbs).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}
