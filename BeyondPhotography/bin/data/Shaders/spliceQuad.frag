#version 120

#define PI 3.1415926

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

struct Region
{
    vec2 upperLeft;
    vec2 size;
    int index;
};

Region fullScreen;

bool isInRegion(vec2 uvAbs, Region r)
{
    if(uvAbs.x > r.upperLeft.x && uvAbs.x <= r.upperLeft.x + r.size.x)
        if(uvAbs.y > r.upperLeft.y && uvAbs.y <= r.upperLeft.y + r.size.y)
            return true;
    return false;
}

Region getRegionByIndex(int index, Region parentRegion)
{
    vec2 midPoint = parentRegion.size / 2.0;
    
    Region regions[4];
    regions[0].upperLeft = parentRegion.upperLeft + vec2(0, 0);
    regions[1].upperLeft = parentRegion.upperLeft + vec2(midPoint.x, 0);
    regions[2].upperLeft = parentRegion.upperLeft + vec2(0, midPoint.y);
    regions[3].upperLeft = parentRegion.upperLeft + vec2(midPoint.x, midPoint.y);
    
    regions[0].size = vec2(midPoint.x, midPoint.y);
    regions[1].size = vec2(midPoint.x, midPoint.y);
    regions[2].size = vec2(midPoint.x, midPoint.y);
    regions[3].size = vec2(midPoint.x, midPoint.y);
    
    regions[index].index = index;
    
    return regions[index];
}

Region computeRegion(vec2 uvAbs, Region parentRegion)
{
    vec2 midPoint = parentRegion.size / 2.0;
    
    Region regions[4];
    regions[0].upperLeft = parentRegion.upperLeft + vec2(0, 0);
    regions[1].upperLeft = parentRegion.upperLeft + vec2(midPoint.x, 0);
    regions[2].upperLeft = parentRegion.upperLeft + vec2(0, midPoint.y);
    regions[3].upperLeft = parentRegion.upperLeft + vec2(midPoint.x, midPoint.y);
    
    regions[0].size = vec2(midPoint.x, midPoint.y);
    regions[1].size = vec2(midPoint.x, midPoint.y);
    regions[2].size = vec2(midPoint.x, midPoint.y);
    regions[3].size = vec2(midPoint.x, midPoint.y);
    
    regions[0].index = -1;
    regions[1].index = -1;
    regions[2].index = -1;
    regions[3].index = -1;

    for(int i = 0; i < 4; i++)
    {
        if(isInRegion(uvAbs, regions[i]))
        {
            regions[i].index = i;
            return regions[i];
        }
    }
    // something went wrong, we must be outside of our parent region.
    return regions[0];
}

vec2 findTargetRegionTransform(vec2 uv, Region majR, Region minR)
{
    Region targetMajorRegion = getRegionByIndex(minR.index, fullScreen);
    Region targetMinorRegion = getRegionByIndex(majR.index, targetMajorRegion);
    
    return targetMinorRegion.upperLeft - minR.upperLeft;
}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    uv *= resolution;
    
    fullScreen.upperLeft = vec2(0, 0);
    fullScreen.size = resolution;
    
    Region majorRegion = computeRegion(uv, fullScreen);
    Region minorRegion = computeRegion(uv, majorRegion);
    
    vec2 transform = findTargetRegionTransform(uv, majorRegion, minorRegion);

//    vec3 debugColors[4];
//    debugColors[0] = vec3(1, 0, 0);
//    debugColors[1] = vec3(0, 1, 0);
//    debugColors[2] = vec3(0, 0, 1);
//    debugColors[3] = vec3(1, 0, 1);
    
    vec3 tc = texture2DRect(inputTexture, uv + transform).rgb;
    
    gl_FragColor = vec4(tc, 1.0);
}
