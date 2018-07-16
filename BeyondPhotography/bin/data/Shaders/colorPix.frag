#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;


float map(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;

    float dx = 10;
    float dy = 10;

    vec2 coord = vec2(dx*floor(uvAbs.x/dx), dy*floor(uvAbs.y/dy));
    
    float col;
    for(int i = 0; i < dx; i++) {
        for(int j = 0; j < dy; j++) {
            col += texture2DRect(inputTexture, coord).r;//sobel(inputTexture, coord);
            coord.x++;
            coord.y++;
        }
        coord.y = 0;
    }
//    col /= dx*dy;
    
    col *= col;
    
    // add s = 1.0 - s; to flip effect.
//
    float dx2 = map(col, 0.0, dx*dy, 0.01, 20); // modify these values to change look.
    float dy2 = map(col, 0.0, dx*dy, 0.01, 20);
    
    vec2 newCoord = vec2(dx2*floor(uvAbs.x/dx2), dy2*floor(uvAbs.y/dy2));
    
    vec3 tc = texture2DRect(inputTexture, newCoord).rgb;

    gl_FragColor = vec4(tc, 1.0);
}
