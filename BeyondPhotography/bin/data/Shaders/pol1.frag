#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    vec2 c = vec2(0.5, 0.5);
    vec2 p = uv - c;
    float r = sqrt(p.x*p.x + p.y*p.y);
    
    float b = r;
    
    //float dx = 20;
    //float dy = 20;
    //vec2 coord = vec2(dx*floor(uv.x/dx), dy*floor(uv.y/dy));
    //vec3 tc = texture2DRect(inputTexture, uv * resolution).rgb;
    gl_FragColor = vec4(vec3(b), 1.0);
}
