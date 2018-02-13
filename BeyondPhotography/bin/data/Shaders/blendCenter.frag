#version 120

uniform sampler2DRect inputTexture1;
uniform sampler2DRect inputTexture2;
uniform vec2 resolution;

float map(float v, float minIn, float maxIn, float minOut, float maxOut) {
    return (v - minIn)/(maxIn-minIn) * (maxOut - minOut) + minOut;
    
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;

    vec3 tc1 = texture2DRect(inputTexture1, uvAbs).rgb;
    vec3 tc2 = texture2DRect(inputTexture2, uvAbs).rgb;
    
    vec3 tc = vec3(0);
    
    tc.x = map(uv.x, 0.0, 1.0, 0.0, 2.0);
    
    float p = 0.3333;
    
    if(uv.x < p) {
        tc = tc1;
    } else if(uv.x > 1.0 - p) {
        tc = tc2;
    } else {
        tc = (tc1 * map(uv.x, p, 1.0 - p, 1.0, 0.0) + tc2 * map(uv.x, p, 1.0 - p, 0.0, 1.0));
    }
    
    gl_FragColor = vec4(tc, 1.0);
}
