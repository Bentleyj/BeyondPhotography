#version 120

uniform sampler2DRect inputTexture1;
uniform sampler2DRect inputTexture2;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    vec3 tc;
    float stepSize = 20;
    if(mod(uvAbs.x, stepSize*2) < stepSize)
        tc = texture2DRect(inputTexture1, uvAbs).rgb;
    else
        tc = texture2DRect(inputTexture2, uvAbs).rgb;

    gl_FragColor = vec4(tc, 1.0);
}
