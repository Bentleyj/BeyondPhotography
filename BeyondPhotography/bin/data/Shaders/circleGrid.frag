#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float _DeltaX = 0.2;
float _DeltaY = 0.2;

float map(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

float circle(vec2 pos, vec2 center, float radius) {
    float xDiff = pos.x - center.x;
    float yDiff = pos.y - center.y;
    
    float r = xDiff*xDiff + yDiff*yDiff;
    
    return r - radius;
}

float drawCircle(vec2 pos, vec2 center, float radius, float width) {
    float a = circle(pos, center, radius);
    return smoothstep(-width/2, 0, a) - smoothstep(0, width/2, a);
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    float dx = 10;
    float dy = 10;
    
    vec2 coord1 = vec2(dx*floor(uvAbs.x/dx), dy*floor(uvAbs.y/dy));
    vec2 coord2 = vec2(dx*ceil(uvAbs.x/dx), dy*ceil(uvAbs.y/dy));
    vec2 coord3 = vec2(dx*floor(uvAbs.x/dx), dy*ceil(uvAbs.y/dy));
    vec2 coord4 = vec2(dx*ceil(uvAbs.x/dx), dy*floor(uvAbs.y/dy));

    vec3 tc1 = texture2DRect(inputTexture, coord1).rgb;
    vec3 tc2 = texture2DRect(inputTexture, coord2).rgb;
    vec3 tc3 = texture2DRect(inputTexture, coord3).rgb;
    vec3 tc4 = texture2DRect(inputTexture, coord4).rgb;


    float radius = dx * 6;
    float width = radius;
    tc1 *= vec3(drawCircle(uvAbs, coord1, radius, width));
    tc2 *= vec3(drawCircle(uvAbs, coord2, radius, width));
    tc3 *= vec3(drawCircle(uvAbs, coord3, radius, width));
    tc4 *= vec3(drawCircle(uvAbs, coord4, radius, width));

    vec3 tc = tc1 + tc2 + tc3 + tc4;

    
    gl_FragColor = vec4(tc, 1.0);
}
