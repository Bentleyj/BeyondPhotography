#version 120

#define PI 3.1415926

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

//    Classic Perlin 2D Noise
//    by Stefan Gustavson
//
float rand(float n){return fract(sin(n) * 43758.5453123);}

float noise(float p){
    float fl = floor(p);
    float fc = fract(p);
    return mix(rand(fl), rand(fl + 1.0), fc);
}

bool getShift(float v, float zoom) {
    float cx = noise(v / zoom);
    if(cx > 0.5)
        return true;
    else
        return false;
}


void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    float scale = 10.0;

    
    vec2 uvAbs = uv * resolution;
    
    bool cx = getShift(uvAbs.x, scale);
//    bool cy = getShift(uvAbs.y, scale);
    
    float xSeed = uvAbs.x;
    for(int i = 0; i < 500; i++) {
        bool oldC = cx;
        cx = getShift(uvAbs.x - i, scale);
        if(cx != oldC) {
            xSeed = uvAbs.x - i;
            break;
        }
    }
    
    float ySeed = uvAbs.y;
//    for(int i = 0; i < 500; i++) {
//        bool oldC = cy;
//        cy = getShift(uvAbs.y - i, scale);
//        if(cy != oldC) {
//            ySeed = uvAbs.y - i;
//            break;
//        }
//    }
    


    vec3 tc = texture2DRect(inputTexture, vec2(xSeed, ySeed)).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}
