#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

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

float map(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;

    float dx = 15;
    float dy = 15;

    vec2 coord = vec2(dx*floor(uvAbs.x/dx), dy*floor(uvAbs.y/dy));
    
    float s;
    for(int i = 0; i < dx; i++) {
        for(int j = 0; j < dy; j++) {
           s += sobel(inputTexture, coord);
            coord.x++;
            coord.y++;
        }
        coord.y = 0;
    }
    s /= dx*dy;
    
    // add s = 1.0 - s; to flip effect.
    
    float dx2 = s * 500.0; // modify these values to change look.
    float dy2 = s * 500.0;
    
    vec2 newCoord = vec2(dx2*floor(uvAbs.x/dx2), dy2*floor(uvAbs.y/dy2));
    
    vec3 tc = texture2DRect(inputTexture, newCoord).rgb;

    gl_FragColor = vec4(tc, 1.0);
}
