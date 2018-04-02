#version 120

#define PI 3.1415926
#define NUM_TILES 130

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
vec2 offsets[NUM_TILES];

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    float scale = 50;
    
    vec2 uvAbs = uv * resolution;

        vec2 size = vec2(75, 75);

    int num = 0;

    for(float i = 0; i < resolution.x; i += size.x) {
        for(float j = 0; j < resolution.y; j += size.y) {
            p[num] = vec2(i, j);
            offsets[num] = vec2(0.5 - rand(num), 0.5 - rand(num + 100));
            num++;
        }
    }
    
    vec3 tc = vec3(1.0) - texture2DRect(inputTexture, uvAbs).rgb;

    for(int i = 0; i < num; i++) {
        if(isInSquare(p[i] + offsets[i] * scale, size, uvAbs)) {
            tc = texture2DRect(inputTexture, uvAbs - offsets[i] * scale).rgb;
        }
    }
    
    gl_FragColor = vec4(tc, 1.0);
}

