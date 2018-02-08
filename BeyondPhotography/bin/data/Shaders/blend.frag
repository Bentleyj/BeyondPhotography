#version 120

uniform sampler2DRect inputTexture1;
uniform sampler2DRect inputTexture2;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;

    vec3 tc1 = texture2DRect(inputTexture1, uvAbs).rgb;
    vec3 tc2 = texture2DRect(inputTexture2, uvAbs).rgb;
    
    vec3 tc = (tc1 + tc2) / 2.0;

    
    gl_FragColor = vec4(tc, 1.0);
}
