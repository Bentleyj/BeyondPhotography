#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

//vec3 rgb2hsv(vec3 c) {
//    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
//    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
//    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
//    float d = q.x - min(q.w, q.y);
//    float e = 1.0e-10;
//    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
//}
//vec3 hsv2rgb(vec3 c) {
//    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
//    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
//    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
//}

float redDiff(vec3 col) {
    return col.r - (col.g + col.b) / 2.0;
}

float map(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    
    float d = redDiff(tc);
//    d = map(d, 0.2, 1.0, 0.0, 1.0);
    
    tc *= d * 5.0;
    
    gl_FragColor = vec4(tc, 1.0);
}
