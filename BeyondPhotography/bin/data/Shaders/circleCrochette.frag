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

    vec3 tc1 = texture2DRect(inputTexture, coord1).rgb;
    vec3 tc2 = texture2DRect(inputTexture, coord2).rgb;

    float radius = dx * 10;
    float width = radius;
    tc1 *= vec3(drawCircle(uvAbs, coord1, radius, width));
    tc2 *= vec3(drawCircle(uvAbs, coord2, radius, width));
    vec3 tc = tc1 + tc2;

    
    gl_FragColor = vec4(tc, 1.0);
}
