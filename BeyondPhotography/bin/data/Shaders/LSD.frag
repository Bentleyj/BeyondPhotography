#version 120

#define PI 3.1415926

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

bool[8] div2Remainder(int decNum) {
    bool value[8];
    for(int i = 0; i < 8; i++) {
        value[i] = false;
    }
    int i = 0;
    while(decNum > 0) {
        int rem = int(mod(decNum, 2));
        value[i] = (rem == 0) ? true : false;
        decNum = decNum / 2;
        i++;
    }
    bool valueOrdered[8];
    for(int i = 0; i < 8; i++) {
        valueOrdered[i] = value[7 - i];
    }
    return valueOrdered;
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    
    vec2 uvAbs = uv * resolution;
    
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    
    bool bits[8];
    bits = div2Remainder(int(tc.r * 256));
    
    tc.r = float(bits[1]);
    
    gl_FragColor = vec4(tc, 1.0);
}
