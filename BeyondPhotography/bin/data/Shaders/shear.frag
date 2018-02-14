#version 120

#define PI 3.1415926

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float rand(float n){return fract(sin(n) * 43758.5453123);}

float noise(float p){
    float fl = floor(p);
    float fc = fract(p);
    return mix(rand(fl), rand(fl + 1.0), fc);
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    uvAbs.y += noise(uvAbs.x * 0.1) * 50.0;
    uvAbs.x += noise(uvAbs.y * 0.1) * 50.0;

    

    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}
