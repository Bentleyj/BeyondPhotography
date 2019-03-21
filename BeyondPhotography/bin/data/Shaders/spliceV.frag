#version 120

#define PI 3.1415926

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    float scale = 0.5;
    
    vec2 uvAbs = uv * resolution;

    int regionWidth = 25;

    int midWay = int(int(0.5 * resolution.x) / regionWidth);

    int numRegions = int(int(1.0 * resolution.x) / regionWidth);

    int pixelRegion = int(int(uvAbs.x) / regionWidth);

    int sourceRegion = (pixelRegion <= midWay) ? pixelRegion + pixelRegion : pixelRegion - (numRegions - pixelRegion);

    vec2 targetPixel = uvAbs; 

    vec2 sourcePixel = vec2(sourceRegion * regionWidth + mod(int(uvAbs.x), regionWidth), uvAbs.y); // ???

    vec3 tc = texture2DRect(inputTexture, sourcePixel).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}
