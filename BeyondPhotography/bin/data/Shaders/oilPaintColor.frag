#version 120
#define N 5

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float map(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

vec3 getAverageDotCol(vec2 v) {
    int red[256];
    int green[256];
    int blue[256];

    for(int i = 0; i < 256; i++) {
        red[i] = 0;
        green[i] = 0;
        blue[i] = 0;
    }
    for(int x = int(v.x) - N; x < int(v.x) + N; x++) {
        for(int y = int(v.y) - N; y < int(v.y) + N; y++) {
            vec3 col = texture2DRect(inputTexture, vec2(x, y)).rgb;
            int r = int(map(col.r, 0.0, 1.0, 0.0, 255));
            red[r]++;
            int g = int(map(col.g, 0.0, 1.0, 0.0, 255));
            green[g]++;
            int b = int(map(col.b, 0.0, 1.0, 0.0, 255));
            blue[b]++;
        }
    }
    int modeIndexRed = 0;
    int modeIndexGreen = 0;
    int modeIndexBlue = 0;

    for(int i = 0; i < 256; i++) {
        if(red[i] > red[modeIndexRed])
            modeIndexRed = i;
        if(green[i] > green[modeIndexGreen])
            modeIndexGreen = i;
        if(blue[i] > blue[modeIndexBlue])
            modeIndexBlue = i;
    }
    
    return vec3(map(modeIndexRed, 0, 255, 0, 1), map(modeIndexGreen, 0, 255, 0, 1), map(modeIndexBlue, 0, 255, 0, 1));
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    vec3 tc = getAverageDotCol(uvAbs);//texture2DRect(inputTexture, uvAbs).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}


