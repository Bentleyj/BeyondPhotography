#version 120

#define PI 3.1415926
#define NUM_TILES 200

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

bool isInSquare(vec2 p, vec2 s, vec2 pixel) {
    if(pixel.x > p.x && pixel.x < p.x + s.x) {
        if(pixel.y > p.y && pixel.y < p.y + s.y) {
            return true;
        }
    }
    return false;
}

vec2 randInSquare(vec2 p) {
    float x = rand(p.x);
    float y = rand(p.y);
    return vec2(x, y);
}

vec2 p[NUM_TILES];

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    float scale = 0.5;
    
    vec2 uvAbs = uv * resolution;
    
    for(int i = 0; i < NUM_TILES; i++) {
        p[i] = (vec2(rand(i), rand(i+100))) * resolution;
    }
    
    vec2 size = vec2(75, 75);
    
    vec3 tc = vec3(1.0) - texture2DRect(inputTexture, uvAbs).rgb;
;
    
    for(int i = 0; i < NUM_TILES; i++) {
        if(isInSquare(p[i], size, uvAbs)) {
            tc = texture2DRect(inputTexture, uvAbs + randInSquare(p[i]) * 75).rgb;
        }
    }

    
    
    gl_FragColor = vec4(tc, 1.0);
}

