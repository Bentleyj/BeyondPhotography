#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;;
    float stepSize = 200;
    if(mod(uvAbs.x, stepSize*2) < stepSize) {
        if(mod(uvAbs.y, stepSize*2) < stepSize) {
            tc = vec3(1.0) - tc;
        }
    }
    else {
        if(mod(uvAbs.y, stepSize*2) > stepSize) {
            tc = vec3(1.0) - tc;
        }
    }

    gl_FragColor = vec4(tc, 1.0);
}
