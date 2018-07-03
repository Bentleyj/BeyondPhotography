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
    
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    
//    if(tc.r > 0.5)
    float radius = 100000;
    float width = radius / 10;
    tc += vec3(drawCircle(uvAbs, resolution/2, radius, width));
    
    gl_FragColor = vec4(tc, 1.0);
}
