#version 120

#define SEARCH_REGION 100
// SEARCH_REGION should be closer to 100 for cool effects

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

vec3 pix[SEARCH_REGION];

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

float length(vec3 v) {
    return (v.x + v.y + v.z) / 3.0;
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    float dy = SEARCH_REGION;
    
    float coord = dy*floor(uvAbs.y/dy);
    
    int index =int(uvAbs.y) - int(coord);
    
    vec3 c = texture2DRect(inputTexture, vec2(uvAbs)).rgb;
    if(length(c) < 0.5) {
        gl_FragColor = vec4(c, 1.0);
        return;
    }
    
    for(int i = 0; i < SEARCH_REGION; i++) {
        pix[i] = texture2DRect(inputTexture, vec2(uvAbs.x, coord)).rgb;
        coord++;
    }
    
    for(int n = SEARCH_REGION; n > 0; n--) {
        for(int i = 0; i < n; i++) {
            vec3 tmp = min(pix[i],pix[i+1]);
            pix[i+1] = pix[i] + pix[i+1] - tmp;
            pix[i] = tmp;
        }
    }
    
    vec3 tc = pix[index];
    
    gl_FragColor = vec4(tc, 1.0);
}
