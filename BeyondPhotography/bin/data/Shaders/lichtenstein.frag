#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;
uniform float thresh;

// The brightnesses at which different hatch lines appear
float hatch_1 = 0.8;
float hatch_2 = 0.6;
float hatch_3 = 0.3;
float hatch_4 = 0.15;

// How close together hatch lines should be placed
float density = 10.0;

// How wide hatch lines are drawn.
float width = 2.0;

float hatch_1_brightness = 0.8;
float hatch_2_brightness = 0.6;
float hatch_3_brightness = 0.3;
float hatch_4_brightness = 0.0;

float d = 1.0; // kernel offset

float lookup(vec2 p, float dx, float dy)
{
    vec2 uv = (p.xy + vec2(dx * d, dy * d)) / resolution.xy;
    vec4 c = texture2DRect(inputTexture, uv.xy * resolution.xy);
    
    // return as luma
    return 0.2126*c.r + 0.7152*c.g + 0.0722*c.b;
}

void main() {
    
    vec2 flipUV = gl_FragCoord.xy / resolution;
    
    flipUV.y = 1.0 - flipUV.y;
    
    
    float ratio = resolution.y / resolution.x;
    float coordX = flipUV.x;
    float coordY = flipUV.y * resolution.y / resolution.x;
    vec2 dstCoord = vec2(coordX, coordY);
    vec2 srcCoord = vec2(coordX, coordY / ratio);
    vec2 uv = srcCoord.xy;
    
    vec3 res = vec3(1.0, 1.0, 1.0);
    vec4 tex = texture2DRect(inputTexture, uv * resolution.xy);
    float brightness = (0.2126*tex.x) + (0.7152*tex.y) + (0.0722*tex.z);
    // check whether we have enough of a hue to warrant coloring our
    // hatch strokes.  If not, just use greyscale for our hatch color.
    float dimmestChannel = min( min( tex.r, tex.g ), tex.b );
    float brightestChannel = max( max( tex.r, tex.g ), tex.b );
    float delta = brightestChannel - dimmestChannel;
    if ( delta > 0.1 )
        tex = tex * ( 1.0 / brightestChannel );
    else
        tex.rgb = vec3(1.0,1.0,1.0);

    
    if (brightness < hatch_1)
    {
        if (mod(gl_FragCoord.x, density) <= width && mod(gl_FragCoord.y, density) <= width)
        {
            res = vec3(tex.rgb * hatch_1_brightness);
        }
    }
//
    if (brightness < hatch_2)
    {
        if (mod(gl_FragCoord.x, density/2.0) <= width && mod(gl_FragCoord.y, density/2.0) <= width)
        {
            res = vec3(tex.rgb * hatch_2_brightness);
        }
    }
//
    if (brightness < hatch_3)
    {
        if (mod(gl_FragCoord.x, density/3.0) <= width && mod(gl_FragCoord.y, density/3.0) <= width)
        {
            res = vec3(tex.rgb * hatch_3_brightness);
        }
    }
////
    if (brightness < hatch_4)
    {
        if (mod(gl_FragCoord.x, density / 4.0) <= width && mod(gl_FragCoord.y, density / 4.0) <= width)
        {
            res = vec3(tex.rgb * hatch_4_brightness);
        }
    }
    
//    vec2 p = flipUV * resolution;
//    
//    // simple sobel edge detection,
//    // borrowed and tweaked from jmk's "edge glow" filter, here:
//    // https://www.shadertoy.com/view/Mdf3zr
//    float gx = 0.0;
//    gx += -1.0 * lookup(p, -1.0, -1.0);
//    gx += -2.0 * lookup(p, -1.0,  0.0);
//    gx += -1.0 * lookup(p, -1.0,  1.0);
//    gx +=  1.0 * lookup(p,  1.0, -1.0);
//    gx +=  2.0 * lookup(p,  1.0,  0.0);
//    gx +=  1.0 * lookup(p,  1.0,  1.0);
//    
//    float gy = 0.0;
//    gy += -1.0 * lookup(p, -1.0, -1.0);
//    gy += -2.0 * lookup(p,  0.0, -1.0);
//    gy += -1.0 * lookup(p,  1.0, -1.0);
//    gy +=  1.0 * lookup(p, -1.0,  1.0);
//    gy +=  2.0 * lookup(p,  0.0,  1.0);
//    gy +=  1.0 * lookup(p,  1.0,  1.0);
    
    // hack: use g^2 to conceal noise in the video
    //float g = gx*gx + gy*gy;
    //res *= (1.0-g);
    
    gl_FragColor = vec4(res, 1.0);
}
