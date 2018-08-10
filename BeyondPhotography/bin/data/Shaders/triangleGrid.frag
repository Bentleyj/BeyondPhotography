#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float _DeltaX = 0.2;
float _DeltaY = 0.2;

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

float drawTriangle(vec2 pos,  vec2 p1, vec2 p2, vec2 p3, float width) {
    float v = 0;
    v += drawLine(pos, p1, p2, width);
    v += drawLine(pos, p2, p3, width);
    v += drawLine(pos, p3, p1, width);
    
    return v;
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
    
    coord1.x += dx*3/4;
    coord3.y -= dx*1/2;
    coord2.x -= dx*1/2;
    
    float width = 2;
    
    vec3 tc1 = texture2DRect(inputTexture, uvAbs).rgb;
    vec3 tc2 = texture2DRect(inputTexture, coord2).rgb;
    vec3 tc3 = texture2DRect(inputTexture, coord3).rgb;
//    vec3 tc4 = texture2DRect(inputTexture, coord4).rgb;
    
//    tc *= vec3(drawTriangle(uvAbs, coord1, coord2, coord3, width));

    tc1 *= vec3(drawTriangle(uvAbs, coord1, coord2, coord3, width));
    tc2 *= vec3(drawTriangle(uvAbs, coord1, coord2, coord3, width));
    tc3 *= vec3(drawTriangle(uvAbs, coord1, coord2, coord3, width));

    vec3 tc = (tc1 + tc2 + tc3) / 3.0;
    
    
    gl_FragColor = vec4(tc, 1.0);
}
