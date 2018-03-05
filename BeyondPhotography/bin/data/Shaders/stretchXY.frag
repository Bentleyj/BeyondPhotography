#version 120

#define PI 3.1415926

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    float C = 0.5;
    
    uv.x = uv.x + sin(((uv.x - C) * 2*PI) * 3.0)/10.0;
    uv.y = uv.y + sin(((uv.y - C) * 2*PI) * 3.0)/10.0;

    
    vec2 uvAbs = uv * resolution;
    
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}
