#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;
uniform float thresh;

float width = 0.05;

float _DeltaX = 0.2;
float _DeltaY = 0.2;

float map(float value, float low1, float high1, float low2, float high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

vec3 mandelBrot(vec2 uv, float xMin, float xMax, float yMin, float yMax) { // This takes a normalized screen coordinate
    // mandelbrot scale X (-2.5, 1)
    // mandelbrot scale Y (-1, 1)
    float x0 = map(uv.x, 0.0, 1.0, xMin, xMax);
    float y0 = map(uv.y, 0.0, 1.0, yMin, yMax);
    float x = 0.0;
    float y = 0.0;
    int i = 0;
    int maxIterations = 100;
    for(;i < maxIterations; i++) {
        if(x * x + y * y < 2 * 2) {
            float xtemp = x*x - y*y + x0;
            y = 2*x*y + y0;
            x = xtemp;
        } else {
            break;
        }
    }
    return vec3(map(i, 0, maxIterations, 0, 1));
}


void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    vec3 col = texture2DRect(inputTexture, uvAbs).rgb;
    
    vec3 mandel = mandelBrot(uv, -2.5, 1., -1., 1.);
    
    vec3 tc = mandel*col;//smoothstep(outline, col, vec3(outline.b));
    
    gl_FragColor = vec4(tc, 1.0);
}
