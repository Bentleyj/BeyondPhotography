#version 120

#define PI 3.14159265358

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

vec2 cartToPol(vec2 v) {
    float r = sqrt(v.x*v.x + v.y*v.y);
    float theta = atan(v.y, v.x);
    return vec2(r, theta);
}

vec2 polToCart(vec2 v) {
    float x = v.x * cos(v.y);
    float y = v.x * sin(v.y);
    return vec2(x, y);
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;

    uv.x -= 0.5;
    uv.y -= 0.5;

    vec2 uvAbs = uv * resolution;

    vec2 uvPolAbs = cartToPol(uvAbs);

    vec3 tc;//texture2DRect(inputTexture, uvAbs).rgb;;

    float width = PI/4;

    if(mod(uvPolAbs.y, width) < width/2) {
    	uvAbs = polToCart(uvPolAbs);
    	uv = uvAbs / resolution;
    	uv.x += 0.5;
    	uv.y += 0.5;
    	uvAbs = uv * resolution;
        tc = texture2DRect(inputTexture, uvAbs).rgb;
    }

    else {
    	uvAbs = polToCart(uvPolAbs);
    	uv = uvAbs / resolution;
    	uv.x += 0.5;
    	uv.y += 0.5;
    	uvAbs = uv * resolution;
        tc = vec3(1.0) - texture2DRect(inputTexture, uvAbs).rgb;
    }
    
    gl_FragColor = vec4(tc, 1.0);
}
