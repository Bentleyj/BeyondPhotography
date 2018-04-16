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

float map(float x, float in_min, float in_max, float out_min, float out_max)
{
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    float scale = 0.5;
    
    vec2 uvAbs = uv * resolution;
    
    float dx = 1.0;
    float dy = map(uv.y, 0.0, 1.0, 100.0, 0.0);
    dy = floor(dy);
    
    vec2 coord = vec2(dx*floor(uvAbs.x/dx), dy*floor(uvAbs.y/dy));
    
    vec3 tc = texture2DRect(inputTexture, coord).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}

