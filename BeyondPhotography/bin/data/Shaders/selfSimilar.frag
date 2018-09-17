#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
        
    vec2 uvAbs = uv * resolution;

    int iterations = 20;
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;

    for(int i = 1; i < iterations + 1; i++) {
	   	uvAbs.x *= 2.0;
	    uvAbs.y *= 2.0;
	    
	    uvAbs.x = mod(uvAbs.x, resolution.x);
	    uvAbs.y = mod(uvAbs.y, resolution.y);

	    tc += texture2DRect(inputTexture, uvAbs).rgb / (i+1);
    }

    gl_FragColor = vec4(tc, 1.0);
}
