#version 120

#define PI 3.1415926

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

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    uv.x -= 0.5;
    uv.y -= 0.5;
    
    vec2 pol = cartToPol(uv);
    pol.x  = pol.x*pol.x;
    
    uv = polToCart(pol);
    
    uv.x += 0.5;
    uv.y += 0.5;
    
    vec2 uvAbs = uv * resolution;

    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}
