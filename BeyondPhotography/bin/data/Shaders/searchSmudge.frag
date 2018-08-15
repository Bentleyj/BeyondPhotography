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

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;

    vec3 col;
    float m = 0;
    int step = 10;
    for(int i = -step; i < step; i++) {
        for(int j = -step; j < step; j++) {
            vec3 c = texture2DRect(inputTexture, uvAbs + vec2(i, j)).rgb;
            float n = length(c);
            if(n > m) {
                m = n;
                col = c;
            }
        }
    }
    
    vec3 tc = col;
    
    gl_FragColor = vec4(tc, 1.0);
}
