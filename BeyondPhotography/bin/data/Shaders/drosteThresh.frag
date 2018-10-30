#version 120

#define PI 3.141592

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float length(vec3 p) {
    return sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;

    if(length(tc) < 0.5) {
        uv = uv - vec2(0.5);
        
        uv = vec2(log(length(uv)), atan(uv.y, uv.x))*mat2(1., 0.11, -0.1, 1.);
        
        uv = exp(uv.x-mod(1.0, 2.1)) * vec2( cos(uv.y), sin(uv.y));
        
        uv = abs(uv);
        
        uv = fract(uv*exp2(ceil(-log2(max(uv.y, uv.x)))));
        
        uvAbs = uv * resolution;
        
        tc = texture2DRect(inputTexture, uvAbs).rgb;
    }

    
    gl_FragColor = vec4(tc, 1.0);
}
