#version 120

#define PI 3.141592

uniform sampler2DRect inputTexture1;
uniform sampler2DRect inputTexture2;
uniform vec2 resolution;

vec3 add(vec3 a, vec3 b)
{
    return a + b;
}

vec3 multiply(vec3 a, vec3 b)
{
    return a * b;
}

vec3 darken(vec3 a, vec3 b)
{
    return min(a, b);
}

vec3 lighten(vec3 a, vec3 b)
{
    return max(a, b);
}

vec3 screen(vec3 a, vec3 b)
{
    return vec3(1) - (vec3(1) - a)/(vec3(1) - b);
}

vec3 colorBurn(vec3 a, vec3 b)
{
    return vec3(1) - (vec3(1) - a)/b;
}

vec3 colorDodge(vec3 a, vec3 b)
{
    return a/(vec3(1) - b);
}

vec3 linearBurn(vec3 a, vec3 b)
{
    return a + b - vec3(1);
}

vec3 overlay(vec3 a, vec3 b)
{
    if(length(a) > 0.5)
    {
        return multiply(a, 2*b);
    } else {
        return screen(a, 2*(b - vec3(0.5)));
    }
}

vec3 hardLight(vec3 a, vec3 b)
{
    if(length(b) < 0.5)
    {
        return multiply(a, 2*b);
    } else {
        return screen(a, 2*(b - vec3(0.5)));
    }
}

vec3 softLight(vec3 a, vec3 b)
{
    return (vec3(1)-2*b) * a * a + 2*b*a;
}

vec3 vividLight(vec3 a, vec3 b)
{
    if(length(b) < 0.5)
    {
        return colorBurn(a, 2*b);
    } else {
        return colorDodge(a, 2*(b - vec3(0.5)));
    }
}

vec3 linearLight(vec3 a, vec3 b)
{
    if(length(b) < 0.5)
    {
        return linearBurn(a, 2*b);
    } else {
        return add(a, 2*(b - vec3(0.5)));
    }
}

vec3 pinLight(vec3 a, vec3 b)
{
    if(length(b) < 0.5)
    {
        return darken(a, 2*b);
    } else {
        return lighten(a, 2*(b - vec3(0.5)));
    }
}

vec3 hardMix(vec3 a, vec3 b)
{
    return ceil(linearLight(a, b));
}

vec3 exclusion(vec3 a, vec3 b)
{
    return a + b - 2*a*b;
}

vec3 difference(vec3 a, vec3 b)
{
    return abs(a - b);
}

vec3 minus(vec3 a, vec3 b)
{
    return abs(a*(vec3(1) - b) - vec3(1));
}

vec3 subtract(vec3 a, vec3 b)
{
    return a - b;
}

vec3 divide(vec3 a, vec3 b)
{
    return a / b;
}




void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    uv *= resolution;
    
    vec3 tc1 = texture2DRect(inputTexture1, uv).rgb;
    vec3 tc2 = texture2DRect(inputTexture2, uv).rgb;
    
    // Blend Multiply
//    gl_FragColor = vec4(multiply(tc1, tc2), 1.0);
    
    // Blend linear burn
//    gl_FragColor = vec4(linearBurn(tc1, tc2), 1.0);

    // Blend color burn
//    gl_FragColor = vec4(colorBurn(tc1, tc2), 1.0);
    
    // Blend darken
//    gl_FragColor = vec4(darken(tc1, tc2), 1.0);
    
    // Blend lighten
//    gl_FragColor = vec4(lighten(tc1, tc2), 1.0);
    
    // Blend screen
//    gl_FragColor = vec4(screen(tc1, tc2), 1.0);
    
    // Blend add
//    gl_FragColor = vec4(add(tc1, tc2), 1.0);
    
    // Blend color dodge
//    gl_FragColor = vec4(colorDodge(tc1, tc2), 1.0);
    
    // Blend overlay
//    gl_FragColor = vec4(overlay(tc1, tc2), 1.0);
    
    // Blend hardlight
//    gl_FragColor = vec4(hardLight(tc1, tc2), 1.0);
    
    // Blend Softlight
//    gl_FragColor = vec4(softLight(tc1, tc2), 1.0);

    // Blend vividLight
//    gl_FragColor = vec4(vividLight(tc1, tc2), 1.0);
    
    // Blend LinearLight
//    gl_FragColor = vec4(linearLight(tc1, tc2), 1.0);
    
    // Blend PinLight
//    gl_FragColor = vec4(pinLight(tc1, tc2), 1.0);
    
    // Blend HardMix
//    gl_FragColor = vec4(hardMix(tc1, tc2), 1.0);
    
    // Blend Exclusion
//    gl_FragColor = vec4(exclusion(tc1, tc2), 1.0);
    
//    // Blend Difference
//    gl_FragColor = vec4(difference(tc1, tc2), 1.0);
    
    // Blend Minus
//    gl_FragColor = vec4(minus(tc1, tc2), 1.0);
    
    // Blend Subtract
//    gl_FragColor = vec4(subtract(tc1, tc2), 1.0);

    // Blend Subtract
    gl_FragColor = vec4(divide(tc1, tc2), 1.0);
    
}
