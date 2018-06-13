#version 120

uniform sampler2DRect inputTexture;
uniform vec2 resolution;

float average(vec3 v) {
    return (v.x + v.y + v.z)/3.0;
}

// This function returns which color is the brightest in the first argument (0 = red, 1 = green, 2 = blue) and how much brighter it is than the average of the other two colors in the second argument (0.0, 1.0);
//vec2 brightestColorDifference(vec3 v) {
//    vec2 max = vec2(0, v.r);
//    float avg = (v.g + v.b) / 2.0;
//    if(v.g > max.y) {
//        max.x = 1;
//        max.y = v.g;
//        avg = (v.r + v.b) / 2.0;
//    }
//    if(v.b > max.y) {
//        max.x = 2;
//        max.y = v.b;
//        avg = (v.r + v.g) / 2.0;
//    }
//    max.y = max.y - avg;
//    return max;
//}

void main() {
    
    vec2 uv = gl_FragCoord.xy / resolution;
    
    uv.y = 1.0 - uv.y;
    
    vec2 uvAbs = uv * resolution;
    
    vec3 tc = texture2DRect(inputTexture, uvAbs).rgb;
    if(tc.r > 0.5) {
    } else {
        tc = vec3(0, 0, 0);
    }
//    if(max.x == 0) {
//        tc.g = 0;
//        tc.b = 0;
//    } else if(max.x == 1) {
//        tc.r = 0;
//        tc.b = 0;
//    } else if(max.y == 2) {
//        tc.r = 0;
//        tc.g = 0;
//    }
//    if(average(tc) > 0.2) {
//        if(mod(uvAbs.y, stepSize*2) < stepSize) {
//            //tc += smoothstep(0.0, 1.0, vec3(mod(uvAbs.y, stepSize) / stepSize));
//        } else if(mod(uvAbs.y, stepSize*2) > stepSize) {
//            //tc += smoothstep(1.0, 0.0, vec3(mod(uvAbs.y, stepSize) / stepSize));
//        }
//    }

    gl_FragColor = vec4(tc, 1.0);
}
