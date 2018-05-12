#version 120

#define PI 3.14159265

uniform sampler2DRect inputTexture1;
uniform sampler2DRect inputTexture2;
uniform vec2 resolution;

float length(vec3 v) {
    return (v.x + v.y + v.z) / 3.0;
}

float map(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

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

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;

    vec2 uvAbs = uv * resolution;

    vec3 tc2 = texture2DRect(inputTexture2, uvAbs).rgb;
    
    uv.y = 1.0 - uv.y;
    
    uv.x -= 0.5;
    uv.y -= 0.5;

    vec2 pol = cartToPol(uv);

    pol.y += map(length(tc2),0.0, 1.0, 0.01, PI/8) + pol.y;

    uv = polToCart(pol);

    uv.x += 0.5;
    uv.y += 0.5;

    uvAbs = uv * resolution;

    vec3 tc = texture2DRect(inputTexture1, uvAbs).rgb;
        
    gl_FragColor = vec4(tc, 1.0);
}
