#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float _DeltaX = 0.2;
float _DeltaY = 0.2;

float length(vec3 v) {
    return v.x + v.y + v.z;
}

float sobel(sampler2DRect tex, vec2 uv)
{
    vec2 delta = vec2(_DeltaX, _DeltaY);
    
    vec4 hr = vec4(0, 0, 0, 0);
    vec4 vt = vec4(0, 0, 0, 0);
    
    hr += texture2DRect(tex, (uv + vec2(-1.0, -1.0) * delta)) *  1.0;
    hr += texture2DRect(tex, (uv + vec2(0.0, -1.0) * delta)) *  0.0;
    hr += texture2DRect(tex, (uv + vec2(1.0, -1.0) * delta)) * -1.0;
    hr += texture2DRect(tex, (uv + vec2(-1.0, 0.0) * delta)) *  2.0;
    hr += texture2DRect(tex, (uv + vec2(0.0, 0.0) * delta)) *  0.0;
    hr += texture2DRect(tex, (uv + vec2(1.0, 0.0) * delta)) * -2.0;
    hr += texture2DRect(tex, (uv + vec2(-1.0, 1.0) * delta)) *  1.0;
    hr += texture2DRect(tex, (uv + vec2(0.0, 1.0) * delta)) *  0.0;
    hr += texture2DRect(tex, (uv + vec2(1.0, 1.0) * delta)) * -1.0;
    
    vt += texture2DRect(tex, (uv + vec2(-1.0, -1.0) * delta)) *  1.0;
    vt += texture2DRect(tex, (uv + vec2(0.0, -1.0) * delta)) *  2.0;
    vt += texture2DRect(tex, (uv + vec2(1.0, -1.0) * delta)) *  1.0;
    vt += texture2DRect(tex, (uv + vec2(-1.0, 0.0) * delta)) *  0.0;
    vt += texture2DRect(tex, (uv + vec2(0.0, 0.0) * delta)) *  0.0;
    vt += texture2DRect(tex, (uv + vec2(1.0, 0.0) * delta)) *  0.0;
    vt += texture2DRect(tex, (uv + vec2(-1.0, 1.0) * delta)) * -1.0;
    vt += texture2DRect(tex, (uv + vec2(0.0, 1.0) * delta)) * -2.0;
    vt += texture2DRect(tex, (uv + vec2(1.0, 1.0) * delta)) * -1.0;
    
    float s = length(hr + vt);
    return s;
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

float map(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;

    vec2 pos[4];
    int step = 40;
    pos[0] = vec2(uvAbs.x+step, uvAbs.y);
    pos[1] = vec2(uvAbs.x-step, uvAbs.y);
    pos[2] = vec2(uvAbs.x, uvAbs.y+step);
    pos[3] = vec2(uvAbs.x, uvAbs.y-step);
    vec3 s[4];
    for(int i = 0; i < 4; i++) {
        s[i] = texture2DRect(inputTexture, pos[i]).rgb;
    }
    
    int m = 0;
    for(int i = 0; i < 4; i++) {
        if(length(s[m]) < length(s[i])) {
            m = i;
        }
    }
    
    vec3 tc = s[m];//drawLine(uvAbs, uvAbs, pos[m], 10);
    
    gl_FragColor = vec4(tc, 1.0);
}
