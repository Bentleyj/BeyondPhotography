#version 120

#define SEARCH_REGION 60
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

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    float coord = SEARCH_REGION*floor(uvAbs.x/SEARCH_REGION);
    
    int index =int(uvAbs.x) - int(coord);
    
    for(int i = 0; i < SEARCH_REGION; i++) {
        pix[i] = rgb2hsv(texture2DRect(inputTexture, vec2(coord, uvAbs.y)).rgb);
        coord++;
    }
    
    for(int n = SEARCH_REGION; n > 0; n--) {
        for(int i = 0; i < n; i++) {
            vec3 tmp = min(pix[i],pix[i+1]);
            pix[i+1] = pix[i] + pix[i+1] - tmp;
            pix[i] = tmp;
        }
    }
    
    vec3 tc = hsv2rgb(pix[index]);
    
    gl_FragColor = vec4(tc, 1.0);
}
