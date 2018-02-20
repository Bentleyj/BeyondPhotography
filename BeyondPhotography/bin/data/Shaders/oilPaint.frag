#version 120
#define N 5

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float map(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

vec3 getAverageDot(vec2 v) {
    int histo[256];
    for(int i = 0; i < 256; i++) {
        histo[i] = 0;
    }
    for(int x = int(v.x) - N; x < int(v.x) + N; x++) {
        for(int y = int(v.y) - N; y < int(v.y) + N; y++) {
            vec3 col = texture2DRect(inputTexture, vec2(x, y)).rgb;
            float val = (col.r + col.g + col.b) / 3.0;
            int red = int(map(val, 0.0, 1.0, 0.0, 255));
            histo[red]++;
        }
    }
    int modeIndex = 0;
    for(int i = 0; i < 256; i++) {
        if(histo[i] > histo[modeIndex])
            modeIndex = i;
    }
    
    return vec3(map(modeIndex, 0, 255, 0, 1));
    
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    vec3 tc = getAverageDot(uvAbs);//texture2DRect(inputTexture, uvAbs).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}


