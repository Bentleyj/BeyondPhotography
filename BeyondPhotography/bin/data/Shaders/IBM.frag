#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

int stepSize = 20;

float length(vec3 v) {
    return (v.x + v.y + v.z) / 3.0;
}

float getNearestLineOffset(float y) {
    
    float offsetLow = mod(y, stepSize);
    float offsetHigh = stepSize - offsetLow;
    
    y += (offsetLow < offsetHigh) ? -offsetLow : offsetHigh;
    return y;
}

float map(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    vec2 pos = vec2(uvAbs.x, getNearestLineOffset(uvAbs.y));
    
    float dist = abs(pos.y - uvAbs.y);
    
    vec3 tc = texture2DRect(inputTexture, pos).rgb;
    
    float darkness = length(tc);
    
    tc = vec3(dist) * darkness;
    
    if(length(tc) < stepSize / 2)
        tc = vec3(0.0);
    else
        tc = vec3(1.0);
    
    gl_FragColor = vec4(tc, 1.0);
}


