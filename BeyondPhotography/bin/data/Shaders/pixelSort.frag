#version 120

#define SEARCH_REGION 10

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

vec3 pix[SEARCH_REGION];

vec3 min(vec3 a, vec3 b) {
    if(length(a) < length(b)) {
        return a;
    }
    return b;
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
    
    for(int i = 0; i < SEARCH_REGION; i++) {
        pix[i] = texture2DRect(inputTexture, vec2(uvAbs.x, coord)).rgb;
        coord++;
    }
    
    for(int n = SEARCH_REGION; n > 0; n--) {
        for(int i = 0; i < n; i++) {
            vec3 tmp = min(pix[i], pix[i+1]);
            pix[i+1] = pix[i] + pix[i+1] - tmp;
            pix[i] = tmp;
        }
    }
    
    vec3 tc = pix[index];
    
    gl_FragColor = vec4(tc, 1.0);
}
