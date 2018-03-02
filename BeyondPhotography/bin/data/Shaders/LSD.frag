#version 120

#define PI 3.1415926

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

bool[8] dec2bin(int decNum) {
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

int bin2dec(bool[8] bits) {
    int decimal = 0;
    for(int i = 7; i >= 0; i--) {
        if(bits[i])
            decimal = decimal*2 + 1;
        else
            decimal = decimal*2;
    }
    return decimal;
}

bool[8] XOR(bool[8] a, bool[8] b) {
    bool value[8];
    for(int i = 0; i < 8; i++) {
        value[i] = (a[i] != b[i]);
    }
    return value;
}

bool[8] bitShiftRight(bool[8] bits, int shift) {
    bool[8] b = bits;
    for(int i = 0; i < 8; i++) {
        bits[i] = b[int(mod(i+shift, 8))];
    }
    return bits;
}

float length(vec3 vec) {
    return (vec.r + vec.g + vec.b) / 3.0;
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    
    vec2 uvAbs = uv * resolution;
    
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    
    float c = length(tc);
    
    bool bitsA[8];
    bool bitsB[8];
    bool bits[8];
    float factor = (128 - (uvAbs.x) * (uvAbs.x - 128) - (uvAbs.y - 128)*(uvAbs.y-128));
    bitsA = dec2bin(int(c * 256));
    bitsB = dec2bin(int(c * 256 * factor));
    
    bits = XOR(bitsA, bitsB);
    
    bits = bitShiftRight(bits, 2);
    
    c = float(bin2dec(bits))/256;
    
    gl_FragColor = vec4(vec3(c), 1.0);
}
