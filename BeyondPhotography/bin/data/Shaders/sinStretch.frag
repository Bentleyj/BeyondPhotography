#version 120

#define PI 3.1415926

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float length(vec3 v) {
    return (v.x + v.y + v.z) / 3.0;
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    float C = 0.2;
    
    uv.x = uv.x + cos(((uv.x - C) * 2*PI) * 2.0)/6.0;
    
    vec2 uvAbs = uv * resolution;

    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    
    
    gl_FragColor = vec4(tc, 1.0);
}
