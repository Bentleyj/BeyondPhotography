#version 120

#define PI 3.1415926

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

//    Classic Perlin 2D Noise
//    by Stefan Gustavson
//
float rand(float n){return fract(sin(n) * 43758.5453123);}

float length(vec3 v) {
    return sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

float noise(float p){
    float fl = floor(p);
    float fc = fract(p);
    return mix(rand(fl), rand(fl + 1.0), fc);
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    
    float scale = 0.5;
    
    vec2 uvAbs = uv * resolution;
    
    vec3 c = texture2DRect(inputTexture, uvAbs).rgb;
    
    if(length(c) > 0.5) {
        float offsetX = 50 - 100 * rand(uvAbs.x);
        float offsetY = 50 - 100 * rand(uvAbs.y);
        
        uvAbs += vec2(offsetX, offsetY);
    }
    
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}

