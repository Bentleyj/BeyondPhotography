#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

vec3 getColor(vec2 uv, vec2 center, vec2 size) {
    float x = uv.x;
    float y = uv.y;
    x *= 2.0;
    y *= 2.0;
    if(uv.x <= center.x && uv.y <= center.y) {
        // top left corner
        x = mod(x, size.x);
        y = mod(y, size.y);
    } else if(uv.x >= center.x && uv.y <= center.y) {
        // top right corner
        x = center.x + mod(x, size.x);
        y = mod(y, size.y);
    } else if(uv.x <= center.x && uv.y >= center.y) {
        // bottom left corner
        x = mod(x, size.x);
        y = center.y + mod(y, size.y);
//        return vec3(0);
    } else if(uv.x >= center.x && uv.y >= center.y) {
        // bottom right corner
        x = center.x + mod(x, size.x);
        y = center.y + mod(y, size.y);
    }
    vec3 col = texture2DRect(inputTexture, vec2(x, y)).rgb;
    return col;
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
        
    vec2 uvAbs = uv * resolution;
    
    float dx = 15.0;
    float dy = 15.0;
    
    vec2 coord = vec2(dx*floor(uvAbs.x/dx), dy*floor(uvAbs.y/dy));

    int iterations = 1;
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    vec2 center = coord;
    vec2 res = vec2(dx, dy);
    
    tc = getColor(uvAbs, center, res);
//
//    vec3 col = getColor(uvAbs, center);
//    tc += col;

//    for(int i = 1; i < iterations + 1; i++) {
//           uvAbs.x *= 2.0;
//        uvAbs.y *= 2.0;
//
//        uvAbs.x = mod(uvAbs.x, resolution.x);
//        uvAbs.y = mod(uvAbs.y, resolution.y);
//
//        tc += texture2DRect(inputTexture, uvAbs).rgb / (i+1);
//    }

    gl_FragColor = vec4(tc, 1.0);
}
