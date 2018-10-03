#version 120

#define PI 3.14159265358
#define NUM_STEPS 20

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

vec2 cartToPol(vec2 v) {
    float r = sqrt(v.x*v.x + v.y*v.y);
    float theta = atan(v.y, v.x);
    return vec2(r, theta);
}

vec2 polToCart(vec2 v) {
    float x = v.x * cos(v.y);
    float y = v.x * sin(v.y);
    return vec2(x, y);
}

float length(vec3 v) {
    return v.x + v.y + v.z;
}

//float map(float value, float low1, float high1, float low2, float high2) {
//    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
//}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    uvAbs -= resolution/2.0;
    
    uvAbs = cartToPol(uvAbs);
    
    int radStep = -20;
    float thetaStep = 2 * PI / 20;
    
    
    vec2 pos[NUM_STEPS];
    for(int i = 0; i < NUM_STEPS; i++) {
        pos[i] = vec2(uvAbs.x + radStep * i, uvAbs.y + thetaStep * i);
        pos[i] = polToCart(pos[i]);
    }
    
    vec3 s[NUM_STEPS];
    for(int i = 0; i < NUM_STEPS; i++) {
        pos[i] += resolution/2.0;
        s[i] = texture2DRect(inputTexture, pos[i]).rgb;
    }
    
    int m = 0;
    for(int i = 0; i < 4; i++) {
        if(length(s[m]) < length(s[i])) {
            m = i;
        }
    }
    
    
    vec3 tc = s[m];
    
    gl_FragColor = vec4(tc, 1.0);
}
