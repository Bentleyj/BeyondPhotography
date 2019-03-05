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

float size(vec3 v) {
    return sqrt(v.x * v.x + v.y * v.y + v.x * v.z);
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;

    float dx = 15.0;
    float dy = 15.0;
    
    vec2 center = vec2(dx*floor(uvAbs.x/dx), dy*floor(uvAbs.y/dy));

    vec3 tcenter = texture2DRect(inputTexture, center).rgb;

    float radius = map(size(tcenter), 0.0, 0.6, 0.0, dx);

    tc *= vec3(drawQuad(uvAbs, center, radius, radius));
    
    gl_FragColor = vec4(tc, 1.0);
}
