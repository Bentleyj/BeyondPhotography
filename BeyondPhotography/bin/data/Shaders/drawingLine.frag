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

float line(vec2 pos, vec2 p1, vec2 p2) {
    float x0, y0, x1, y1, x2, y2;
    x0 = pos.x;
    y0 = pos.y;
    x1 = p1.x;
    x2 = p2.x;
    y1 = p1.y;
    y2 = p2.y;
    float num = abs((y2-y1)*x0-(x2-x1)*y0+x2*y1-y2*x1);
    float xDiff = (y2-y1);
    float yDiff = (x2-x1);
    float denom = sqrt(xDiff*xDiff + yDiff*yDiff);
    float d = num / denom;
    return d;
}

float drawLine(vec2 pos, vec2 p1, vec2 p2, float width) {
    float a = line(pos, p1, p2);
    if(pos.x < min(p1.x, p2.x)) {
        return 0;
    }
    if(pos.x > max(p1.x, p2.x)) {
        return 0;
    }
    if(pos.y < min(p1.y, p2.y)) {
        return 0;
    }
    if(pos.y > max(p1.y, p2.y)) {
        return 0;
    }
    return smoothstep(width, 0, a);
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
    float width = 2;
    tc += drawLine(uvAbs, vec2(resolution.x/2, resolution.y/4), vec2(resolution.x/4, resolution.y/2), width);
    tc += drawLine(uvAbs, vec2(resolution.x/2, resolution.y/4), vec2(resolution.x*3/4, resolution.y/2), width);
    tc += drawLine(uvAbs, vec2(resolution.x*3/4, resolution.y/2), vec2(resolution.x/4, resolution.y/2), width);
    
    tc += drawCircle(uvAbs, vec2(resolution.x/2, resolution.y/4), 300, 100);
    tc += drawCircle(uvAbs, vec2(resolution.x*3/4, resolution.y/2), 300, 100);
    tc += drawCircle(uvAbs, vec2(resolution.x/4, resolution.y/2), 300, 100);

    
    gl_FragColor = vec4(tc, 1.0);
}
