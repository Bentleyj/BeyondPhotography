#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float _DeltaX = 0.2;
float _DeltaY = 0.2;

float length(vec3 v) {
    return v.x + v.y + v.z;
}

float map(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
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

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;

    vec2 pos, pos2;
    float m = 0;
    float m2 = 0;
    int step = 5;
    for(int i = -step; i < step; i++) {
        for(int j = -step; j < step; j++) {
            vec2 p = uvAbs + vec2(i, j);
            vec3 c = texture2DRect(inputTexture, p).rgb;
            float n = length(c);
            if(n > m) {
                m = n;
                pos = p;
            } else if(n > m2) {
                m2 = n;
                pos2 = p;
            }
        }
    }
    
    vec3 tc = vec3(drawLine(uvAbs, pos, pos2, 2));
    
    gl_FragColor = vec4(tc, 1.0);
}
