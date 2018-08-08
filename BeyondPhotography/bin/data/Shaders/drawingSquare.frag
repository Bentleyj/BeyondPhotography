#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float _DeltaX = 0.2;
float _DeltaY = 0.2;

float map(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

float drawQuad(vec2 pos, vec2 center, float width, float height) {
    if(pos.x < center.x + width/2 && pos.x > center.x - width/2) {
        if(pos.y < center.y + height/2 && pos.y > center.y - height/2) {
            return 1.0;
        }
    }
    
    return 0.0;
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    
//    if(tc.r > 0.5)
    float radius = 300;
    tc *= vec3(drawQuad(uvAbs, resolution/3, radius, radius));
    
    gl_FragColor = vec4(tc, 1.0);
}
