#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float length(vec3 v) {
    return (v.x + v.y + v.z) / 3.0;
}

int stepSize = 50;

int getNearestLineOffset(int y) {
    return int(mod(y, stepSize));
//    int offsetHigh = mod(y + stepSize, stepSize);
//
//    if(offsetLow == offsetHigh) {
//        return 0;
//    }
//
//    return (offsetLow > offsetHigh) ? offsetLow : offsetHigh;
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    vec3 tc = texture2DRect(inputTexture, vec2(uvAbs.x + getNearestLineOffset(int(uvAbs.x)), uvAbs.y)).rgb;
    
//    if(mod(uvAbs.y, stepSize) < 1)
//        tc = vec3(1, 0, 0);
    
    gl_FragColor = vec4(tc, 1.0);
}


