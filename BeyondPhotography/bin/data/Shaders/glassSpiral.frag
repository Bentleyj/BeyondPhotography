#version 120
#define PI 3.14159265

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float length(vec3 v) {
    return (v.x + v.y + v.z) / 3.0;
}

int stepSize = 50;

int getNearestLineOffset(int y) {
    return int(mod(y, stepSize));
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 c = vec2(0.5, 0.5);
    vec2 p = uv - c;
    float x = p.x;
    float y = p.y;
    float r = sqrt(p.x*p.x + p.y*p.y);
    float theta = atan(y, x) / PI;
    
    vec2 uvAbs = uv * resolution;
    
    float offset = mod(int(theta * 180 / PI) + int(r * 100.0), int(10));
    
    vec3 tc = texture2DRect(inputTexture, vec2(uvAbs.x + offset, uvAbs.y)).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}


