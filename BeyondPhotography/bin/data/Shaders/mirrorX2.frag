#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    if(uv.x >= 0.5) {
        uv.x = 1.0 - uv.x;
    } else {
        uv = uv;
    }

    vec2 uvAbs = uv * resolution;
    
    uvAbs.x = mod(uvAbs.x, resolution.x);

    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}
