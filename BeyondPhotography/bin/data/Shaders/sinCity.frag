#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float average(vec3 v) {
    return (v.x + v.y + v.z)/3.0;
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    vec3 neg = vec3(1.0) - tc;
    float stepSize = 10;
    if(average(tc) > 0.2) {
        if(mod(uvAbs.y, stepSize*2) < stepSize) {
            tc += smoothstep(0.0, 1.0, vec3(mod(uvAbs.y, stepSize) / stepSize));
        } else if(mod(uvAbs.y, stepSize*2) > stepSize) {
            tc += smoothstep(1.0, 0.0, vec3(mod(uvAbs.y, stepSize) / stepSize));
        }
    }

    gl_FragColor = vec4(tc, 1.0);
}
