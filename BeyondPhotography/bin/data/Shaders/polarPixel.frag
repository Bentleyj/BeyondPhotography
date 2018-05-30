#version 120

#define PI 3.1415926

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

//    Classic Perlin 2D Noise
//    by Stefan Gustavson
//
float rand(float n){return fract(sin(n) * 43758.5453123);}

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

float noise(float p){
    float fl = floor(p);
    float fc = fract(p);
    return mix(rand(fl), rand(fl + 1.0), fc);
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    uv.x -= 0.5;
    uv.y -= 0.5;
    
    vec2 uvAbs = uv * resolution;
    
    vec2 uvPol = cartToPol(uvAbs);
    
    float dx = 15.0;
    float dy = PI/20.0;
    
    vec2 uvPolPix = vec2(dx*floor(uvPol.x/dx),dy*floor(uvPol.y/dy));
    
    uvAbs = polToCart(uvPolPix);
    
    uv = uvAbs / resolution;
    
    uv.x += 0.5;
    uv.y += 0.5;
    
    uvAbs = uv * resolution;
    
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}
