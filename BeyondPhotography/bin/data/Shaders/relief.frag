#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    //float dx = 20;
    //float dy = 20;
    //vec2 coord = vec2(dx*floor(uv.x/dx), dy*floor(uv.y/dy));
    vec3 tc = texture2DRect(inputTexture, uv * resolution).rgb;
    vec2 uvAbs = uv * resolution;
    uvAbs.x += 2;
    uvAbs.y += 2;
    
    tc = tc + (0.5 - texture2DRect(inputTexture, uvAbs).rgb);
    
    //tc = (5.0 * tc - tc1 - tc2 - tc3 - tc4);

    gl_FragColor = vec4(tc, 1.0);
}
