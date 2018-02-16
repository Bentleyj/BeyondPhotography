#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float length(vec3 v) {
    return (v.x + v.y + v.z) / 3.0;
}

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    int step = 1;
    
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    vec3 tc2 = texture2DRect(inputTexture, vec2(uvAbs.x, uvAbs.y - rand(uv.xx) * 75.0)).rgb;
    
    if(length(tc) < length(tc2)) {
        tc = tc2;
    }
    
    gl_FragColor = vec4(tc, 1.0);
}


