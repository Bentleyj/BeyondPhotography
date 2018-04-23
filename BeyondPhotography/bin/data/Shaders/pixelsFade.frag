#version 120

#define PI 3.1415926

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

//    Classic Perlin 2D Noise
//    by Stefan Gustavson
//

float map(float x, float in_min, float in_max, float out_min, float out_max)
{
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

float nonLinearMap(float x, float in_min, float in_max, float out_min, float out_max) {
    float xVal = x - in_min;
    float xMax = in_max - in_min;
    xVal /= in_max;
    xVal = 0.5 * sin(xVal*3);
    xVal *= out_max - out_min;
    xVal += out_min;
    return xVal;
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    float scale = 0.5;
    
    vec2 uvAbs = uv * resolution;
    
    vec2 coord;
    int numSteps = 100;
    float dx = 1.0;
    float dy = nonLinearMap(uvAbs.y, 0.0, resolution.y, numSteps, 0.0);
    dy = floor(dy);
    for(int i = 1; i < 500; i++) {
        float dyAbove = nonLinearMap(uvAbs.y-i, 0.0, resolution.y, numSteps, 0.0);
        dyAbove = floor(dyAbove);
        if(dy != dyAbove) {
            coord = vec2(uvAbs.x, uvAbs.y-i);
            break;
        }
    }

    dy = map(dy, 0.0, 10, 0.0, 1.0);
    
    vec3 tc = texture2DRect(inputTexture, coord).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}

