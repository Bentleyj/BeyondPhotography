#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float length(vec3 v) {
    return sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
}

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
    
    float b;
    for(int i = 0; i < dx; i++) {
        for(int j = 0; j < dy; j++) {
            b += length(texture2DRect(inputTexture, coord).rrr);//sobel(inputTexture, coord);
            coord.x++;
            coord.y++;
        }
        coord.y = 0;
    }

    float dx2 = map(b, 0.0, dx*dy, 50, 0.01); // modify these values to change look.
    float dy2 = map(b, 0.0, dx*dy, 50, 0.01);
    
    vec2 newCoord = vec2(dx2*floor(uvAbs.x/dx2), dy2*floor(uvAbs.y/dy2));
    
    vec3 tc = texture2DRect(inputTexture, newCoord).rgb;

    gl_FragColor = vec4(tc, 1.0);
}
