#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;
uniform float thresh;

float width = 0.05;

float red = 0.0;
float yellow = 0.045;
float blue = 0.6; //-0.7
vec3 redCol = vec3(191./255., 81./255., 65./255.);
vec3 yellowCol = vec3(234./255., 102./255., 185./255.);
vec3 blueCol = vec3(250./255., 213./255., 90./255.);

float _DeltaX = 0.2;
float _DeltaY = 0.2;

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

vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 warholColor(vec2 uvAbs, vec3 outCol, float hThresh, float width) {
    vec3 col = texture2DRect(inputTexture, uvAbs).rgb;
    
    vec3 tc1 = texture2DRect(inputTexture, vec2(uvAbs.x + 5, uvAbs.y)).rgb;
    vec3 tc2 = texture2DRect(inputTexture, vec2(uvAbs.x - 5, uvAbs.y)).rgb;
    vec3 tc3 = texture2DRect(inputTexture, vec2(uvAbs.x, uvAbs.y + 5)).rgb;
    vec3 tc4 = texture2DRect(inputTexture, vec2(uvAbs.x, uvAbs.y - 5)).rgb;
    
    col = (col + tc1 + tc2 + tc3 + tc4) / 5.0;
    
    vec3 hsv = rgb2hsv(col);
    
    if((hsv.r < hThresh || hsv.r > hThresh + width))
        col = vec3(0);
    else
        col = outCol;
    
    return col;
}

float map(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    uvAbs.x -= 10;
    
    vec3 cR = warholColor(uvAbs, redCol, red, width);
    uvAbs.x -= 10;

    vec3 cG = warholColor(uvAbs, blueCol, blue, width*2);
    uvAbs.x -= 10;

    vec3 cY = warholColor(uvAbs, yellowCol, yellow, width*2);

    float s = sobel(inputTexture, vec2(uvAbs.x +35, uvAbs.y));

    vec3 col = cR + cG + cY;

    vec3 outline = smoothstep(vec3(0), vec3(1), vec3(s));
    
    outline *= vec3(0, 1, 1);
    
    vec3 tc = col + outline;//smoothstep(outline, col, vec3(outline.b));
    
    gl_FragColor = vec4(tc, 1.0);
}
