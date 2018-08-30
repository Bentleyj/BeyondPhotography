#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    // Load images
    images.resize(3);
    images[0].load("Images/Girl_With_A_Pearl_Earring.jpg");
    images[1].load("Images/MonaLisa.jpg");
    images[2].load("Images/wood.jpg");
    
    // setup video grabber
    grabber.initGrabber(images[0].getWidth(), images[0].getHeight());
    
    screenResolution.x = images[0].getWidth();
    screenResolution.y = images[0].getHeight();
    
    ofSetWindowShape(images[0].getWidth(), images[0].getHeight());
    
    Effect test;
    test.loadShader("Shaders/test");
    test.addUniform("inputTexture", &images[0]);
    test.addUniform("resolution", &screenResolution);
    test.width = images[0].getWidth();
    test.height = images[0].getHeight();
    effects.push_back(test);
    
    Effect diagonal;
    diagonal.loadShader("Shaders/diagonal");
    diagonal.addUniform("resolution", &screenResolution);
    diagonal.width = images[0].getWidth();
    diagonal.height = images[0].getHeight();
    effects.push_back(diagonal);
    
    Effect modulo;
    modulo.loadShader("Shaders/modulo");
    modulo.addUniform("resolution", &screenResolution);
    modulo.width = images[0].getWidth();
    modulo.height = images[0].getHeight();
    effects.push_back(modulo);
    
    Effect sine;
    sine.loadShader("Shaders/sine");
    sine.addUniform("resolution", &screenResolution);
    sine.width = images[0].getWidth();
    sine.height = images[0].getHeight();
    effects.push_back(sine);
    
    Effect atan;
    atan.loadShader("Shaders/atan");
    atan.addUniform("resolution", &screenResolution);
    atan.width = images[0].getWidth();
    atan.height = images[0].getHeight();
    effects.push_back(atan);
    
    Effect cond1;
    cond1.loadShader("Shaders/cond1");
    cond1.addUniform("resolution", &screenResolution);
    cond1.width = images[0].getWidth();
    cond1.height = images[0].getHeight();
    effects.push_back(cond1);
    
    Effect cond2;
    cond2.loadShader("Shaders/cond2");
    cond2.addUniform("resolution", &screenResolution);
    cond2.width = images[0].getWidth();
    cond2.height = images[0].getHeight();
    effects.push_back(cond2);
    
    Effect pol1;
    pol1.loadShader("Shaders/pol1");
    pol1.addUniform("resolution", &screenResolution);
    pol1.width = images[0].getWidth();
    pol1.height = images[0].getHeight();
    effects.push_back(pol1);
    
    Effect spiral;
    spiral.loadShader("Shaders/spiral");
    spiral.addUniform("resolution", &screenResolution);
    spiral.width = images[0].getWidth();
    spiral.height = images[0].getHeight();
    effects.push_back(spiral);
    
    Effect negative;
    negative.loadShader("Shaders/negative");
    negative.addUniform("resolution", &screenResolution);
    negative.addUniform("inputTexture", &images[0]);
    negative.width = images[0].getWidth();
    negative.height = images[0].getHeight();
    effects.push_back(negative);
    
    Effect solarize;
    solarize.loadShader("Shaders/solarize");
    solarize.addUniform("resolution", &screenResolution);
    solarize.addUniform("inputTexture", &images[0]);
    solarize.width = images[0].getWidth();
    solarize.height = images[0].getHeight();
    effects.push_back(solarize);
    
    Effect solarizeFade;
    solarizeFade.loadShader("Shaders/solarizeFade");
    solarizeFade.addUniform("resolution", &screenResolution);
    solarizeFade.addUniform("inputTexture", &images[0]);
    solarizeFade.width = images[0].getWidth();
    solarizeFade.height = images[0].getHeight();
    effects.push_back(solarizeFade);
    
    Effect blur;
    blur.loadShader("Shaders/blur");
    blur.addUniform("resolution", &screenResolution);
    blur.addUniform("inputTexture", &images[0]);
    blur.width = images[0].getWidth();
    blur.height = images[0].getHeight();
    effects.push_back(blur);
    
    Effect sharpen;
    sharpen.loadShader("Shaders/sharpen");
    sharpen.addUniform("resolution", &screenResolution);
    sharpen.addUniform("inputTexture", &images[0]);
    sharpen.width = images[0].getWidth();
    sharpen.height = images[0].getHeight();
    effects.push_back(sharpen);
    
    Effect relief;
    relief.loadShader("Shaders/relief");
    relief.addUniform("resolution", &screenResolution);
    relief.addUniform("inputTexture", &images[0]);
    relief.width = images[0].getWidth();
    relief.height = images[0].getHeight();
    effects.push_back(relief);
    
    Effect mirrorY;
    mirrorY.loadShader("Shaders/mirrorY");
    mirrorY.addUniform("resolution", &screenResolution);
    mirrorY.addUniform("inputTexture", &images[0]);
    mirrorY.width = images[0].getWidth();
    mirrorY.height = images[0].getHeight();
    effects.push_back(mirrorY);
    
    Effect rotate90;
    rotate90.loadShader("Shaders/rotate90");
    rotate90.addUniform("resolution", &screenResolution);
    rotate90.addUniform("inputTexture", &images[0]);
    rotate90.width = images[0].getWidth();
    rotate90.height = images[0].getHeight();
    effects.push_back(rotate90);
    
    Effect stretchX;
    stretchX.loadShader("Shaders/stretchX");
    stretchX.addUniform("resolution", &screenResolution);
    stretchX.addUniform("inputTexture", &images[0]);
    stretchX.width = images[0].getWidth();
    stretchX.height = images[0].getHeight();
    effects.push_back(stretchX);
    
    Effect shrink;
    shrink.loadShader("Shaders/shrink");
    shrink.addUniform("resolution", &screenResolution);
    shrink.addUniform("inputTexture", &images[0]);
    shrink.width = images[0].getWidth();
    shrink.height = images[0].getHeight();
    effects.push_back(shrink);
    
    Effect mirrorX;
    mirrorX.loadShader("Shaders/mirrorX");
    mirrorX.addUniform("resolution", &screenResolution);
    mirrorX.addUniform("inputTexture", &images[0]);
    mirrorX.width = images[0].getWidth();
    mirrorX.height = images[0].getHeight();
    effects.push_back(mirrorX);
    
    Effect mirrorX2;
    mirrorX2.loadShader("Shaders/mirrorX2");
    mirrorX2.addUniform("resolution", &screenResolution);
    mirrorX2.addUniform("inputTexture", &images[0]);
    mirrorX2.width = images[0].getWidth();
    mirrorX2.height = images[0].getHeight();
    effects.push_back(mirrorX2);
    
    Effect blend;
    blend.loadShader("Shaders/blend");
    blend.addUniform("resolution", &screenResolution);
    blend.addUniform("inputTexture1", &images[0]);
    blend.addUniform("inputTexture2", &images[1]);
    blend.width = images[0].getWidth();
    blend.height = images[0].getHeight();
    effects.push_back(blend);
    
    Effect blendLinear;
    blendLinear.loadShader("Shaders/blendLinear");
    blendLinear.addUniform("resolution", &screenResolution);
    blendLinear.addUniform("inputTexture1", &images[0]);
    blendLinear.addUniform("inputTexture2", &images[1]);
    blendLinear.width = images[0].getWidth();
    blendLinear.height = images[0].getHeight();
    effects.push_back(blendLinear);
    
    Effect blendCenter;
    blendCenter.loadShader("Shaders/blendCenter");
    blendCenter.addUniform("resolution", &screenResolution);
    blendCenter.addUniform("inputTexture1", &images[0]);
    blendCenter.addUniform("inputTexture2", &images[1]);
    blendCenter.width = images[0].getWidth();
    blendCenter.height = images[0].getHeight();
    effects.push_back(blendCenter);
    
    Effect blendBrightness;
    blendBrightness.loadShader("Shaders/blendBrightness");
    blendBrightness.addUniform("resolution", &screenResolution);
    blendBrightness.addUniform("inputTexture1", &images[0]);
    blendBrightness.addUniform("inputTexture2", &images[1]);
    blendBrightness.width = images[0].getWidth();
    blendBrightness.height = images[0].getHeight();
    effects.push_back(blendBrightness);
    
    Effect blendBrightnessSmooth;
    blendBrightnessSmooth.loadShader("Shaders/blendBrightnessSmooth");
    blendBrightnessSmooth.addUniform("resolution", &screenResolution);
    blendBrightnessSmooth.addUniform("inputTexture1", &images[0]);
    blendBrightnessSmooth.addUniform("inputTexture2", &images[1]);
    blendBrightnessSmooth.width = images[0].getWidth();
    blendBrightnessSmooth.height = images[0].getHeight();
    effects.push_back(blendBrightnessSmooth);
    
    Effect sinStretch;
    sinStretch.loadShader("Shaders/sinStretch");
    sinStretch.addUniform("resolution", &screenResolution);
    sinStretch.addUniform("inputTexture", &images[0]);
    sinStretch.width = images[0].getWidth();
    sinStretch.height = images[0].getHeight();
    effects.push_back(sinStretch);
    
    Effect cone;
    cone.loadShader("Shaders/cone");
    cone.addUniform("resolution", &screenResolution);
    cone.addUniform("inputTexture", &images[0]);
    cone.width = images[0].getWidth();
    cone.height = images[0].getHeight();
    effects.push_back(cone);
    
    Effect shear;
    shear.loadShader("Shaders/shear");
    shear.addUniform("resolution", &screenResolution);
    shear.addUniform("inputTexture", &images[0]);
    shear.width = images[0].getWidth();
    shear.height = images[0].getHeight();
    effects.push_back(shear);
    
    Effect Bentley;
    Bentley.loadShader("Shaders/Bentley");
    Bentley.addUniform("resolution", &screenResolution);
    Bentley.addUniform("inputTexture", &images[0]);
    Bentley.width = images[0].getWidth();
    Bentley.height = images[0].getHeight();
    effects.push_back(Bentley);
    
    Effect BentleyRand;
    BentleyRand.loadShader("Shaders/BentleyRand");
    BentleyRand.addUniform("resolution", &screenResolution);
    BentleyRand.addUniform("inputTexture", &images[0]);
    BentleyRand.width = images[0].getWidth();
    BentleyRand.height = images[0].getHeight();
    effects.push_back(BentleyRand);
    
    Effect Melt;
    Melt.loadShader("Shaders/Melt");
    Melt.addUniform("resolution", &screenResolution);
    Melt.addUniform("inputTexture", &images[0]);
    Melt.width = images[0].getWidth();
    Melt.height = images[0].getHeight();
    effects.push_back(Melt);
    
    Effect Split;
    Split.loadShader("Shaders/Split");
    Split.addUniform("resolution", &screenResolution);
    Split.addUniform("inputTexture", &images[0]);
    Split.width = images[0].getWidth();
    Split.height = images[0].getHeight();
    effects.push_back(Split);
    
    Effect IBM;
    IBM.loadShader("Shaders/IBM");
    IBM.addUniform("resolution", &screenResolution);
    IBM.addUniform("inputTexture", &images[0]);
    IBM.width = images[0].getWidth();
    IBM.height = images[0].getHeight();
    effects.push_back(IBM);
    
    Effect Swirl;
    Swirl.loadShader("Shaders/Swirl");
    Swirl.addUniform("resolution", &screenResolution);
    Swirl.addUniform("inputTexture", &images[0]);
    Swirl.width = images[0].getWidth();
    Swirl.height = images[0].getHeight();
    effects.push_back(Swirl);
    
    Effect oilPaint;
    oilPaint.loadShader("Shaders/oilPaint");
    oilPaint.addUniform("resolution", &screenResolution);
    oilPaint.addUniform("inputTexture", &images[0]);
    oilPaint.width = images[0].getWidth();
    oilPaint.height = images[0].getHeight();
    effects.push_back(oilPaint);
    
    Effect CylinderProj;
    CylinderProj.loadShader("Shaders/CylinderProj");
    CylinderProj.addUniform("resolution", &screenResolution);
    CylinderProj.addUniform("inputTexture", &images[0]);
    CylinderProj.width = images[0].getWidth();
    CylinderProj.height = images[0].getHeight();
    effects.push_back(CylinderProj);
    
    Effect BlockShift;
    BlockShift.loadShader("Shaders/BlockShift");
    BlockShift.addUniform("resolution", &screenResolution);
    BlockShift.addUniform("inputTexture", &images[0]);
    BlockShift.width = images[0].getWidth();
    BlockShift.height = images[0].getHeight();
    effects.push_back(BlockShift);
    
    Effect warp;
    warp.loadShader("Shaders/warp");
    warp.addUniform("resolution", &screenResolution);
    warp.addUniform("inputTexture1", &images[0]);
    warp.addUniform("inputTexture2", &images[1]);
    warp.width = images[0].getWidth();
    warp.height = images[0].getHeight();
    effects.push_back(warp);
    
    Effect LSD;
    LSD.loadShader("Shaders/LSD");
    LSD.addUniform("resolution", &screenResolution);
    LSD.addUniform("inputTexture", &images[0]);
    LSD.width = images[0].getWidth();
    LSD.height = images[0].getHeight();
    effects.push_back(LSD);
    
    Effect stretchXY;
    stretchXY.loadShader("Shaders/stretchXY");
    stretchXY.addUniform("resolution", &screenResolution);
    stretchXY.addUniform("inputTexture", &images[0]);
    stretchXY.width = images[0].getWidth();
    stretchXY.height = images[0].getHeight();
    effects.push_back(stretchXY);
    
    Effect glassVertical;
    glassVertical.loadShader("Shaders/glassVertical");
    glassVertical.addUniform("resolution", &screenResolution);
    glassVertical.addUniform("inputTexture", &images[0]);
    glassVertical.width = images[0].getWidth();
    glassVertical.height = images[0].getHeight();
    effects.push_back(glassVertical);
    
    Effect glassSpiral;
    glassSpiral.loadShader("Shaders/glassSpiral");
    glassSpiral.addUniform("resolution", &screenResolution);
    glassSpiral.addUniform("inputTexture", &images[0]);
    glassSpiral.width = images[0].getWidth();
    glassSpiral.height = images[0].getHeight();
    effects.push_back(glassSpiral);
    
    Effect fishEye;
    fishEye.loadShader("Shaders/fishEye");
    fishEye.addUniform("resolution", &screenResolution);
    fishEye.addUniform("inputTexture", &images[0]);
    fishEye.width = images[0].getWidth();
    fishEye.height = images[0].getHeight();
    effects.push_back(fishEye);
    
    Effect randomPixels;
    randomPixels.loadShader("Shaders/randomPixels");
    randomPixels.addUniform("resolution", &screenResolution);
    randomPixels.addUniform("inputTexture", &images[0]);
    randomPixels.width = images[0].getWidth();
    randomPixels.height = images[0].getHeight();
    effects.push_back(randomPixels);
    
    Effect pixelate;
    pixelate.loadShader("Shaders/pixelate");
    pixelate.addUniform("resolution", &screenResolution);
    pixelate.addUniform("inputTexture", &images[0]);
    pixelate.width = images[0].getWidth();
    pixelate.height = images[0].getHeight();
    effects.push_back(pixelate);
    
    Effect weave;
    weave.loadShader("Shaders/weave");
    weave.addUniform("resolution", &screenResolution);
    weave.addUniform("inputTexture", &images[0]);
    weave.width = images[0].getWidth();
    weave.height = images[0].getHeight();
    effects.push_back(weave);
    
    Effect tileFlip;
    tileFlip.loadShader("Shaders/tileFlip");
    tileFlip.addUniform("resolution", &screenResolution);
    tileFlip.addUniform("inputTexture", &images[0]);
    tileFlip.width = images[0].getWidth();
    tileFlip.height = images[0].getHeight();
    effects.push_back(tileFlip);
    
    Effect tileExplode;
    tileExplode.loadShader("Shaders/tileExplode");
    tileExplode.addUniform("resolution", &screenResolution);
    tileExplode.addUniform("inputTexture", &images[0]);
    tileExplode.width = images[0].getWidth();
    tileExplode.height = images[0].getHeight();
    effects.push_back(tileExplode);
    
    Effect gridExplode;
    gridExplode.loadShader("Shaders/gridExplode");
    gridExplode.addUniform("resolution", &screenResolution);
    gridExplode.addUniform("inputTexture", &images[0]);
    gridExplode.width = images[0].getWidth();
    gridExplode.height = images[0].getHeight();
    effects.push_back(gridExplode);
    
    Effect thresholdRGB;
    thresholdRGB.loadShader("Shaders/thresholdRGB");
    thresholdRGB.addUniform("resolution", &screenResolution);
    thresholdRGB.addUniform("inputTexture", &images[0]);
    thresholdRGB.width = images[0].getWidth();
    thresholdRGB.height = images[0].getHeight();
    effects.push_back(thresholdRGB);
    
    Effect thresholdRGBSoft;
    thresholdRGBSoft.loadShader("Shaders/thresholdRGBSoft");
    thresholdRGBSoft.addUniform("resolution", &screenResolution);
    thresholdRGBSoft.addUniform("inputTexture", &images[0]);
    thresholdRGBSoft.width = images[0].getWidth();
    thresholdRGBSoft.height = images[0].getHeight();
    effects.push_back(thresholdRGBSoft);
    
    Effect pixelsRandY;
    pixelsRandY.loadShader("Shaders/pixelsRandY");
    pixelsRandY.addUniform("resolution", &screenResolution);
    pixelsRandY.addUniform("inputTexture", &images[0]);
    pixelsRandY.width = images[0].getWidth();
    pixelsRandY.height = images[0].getHeight();
    effects.push_back(pixelsRandY);
    
    Effect pixelsRandX;
    pixelsRandX.loadShader("Shaders/pixelsRandX");
    pixelsRandX.addUniform("resolution", &screenResolution);
    pixelsRandX.addUniform("inputTexture", &images[0]);
    pixelsRandX.width = images[0].getWidth();
    pixelsRandX.height = images[0].getHeight();
    effects.push_back(pixelsRandX);
    
    Effect pixelsSlant;
    pixelsSlant.loadShader("Shaders/pixelsSlant");
    pixelsSlant.addUniform("resolution", &screenResolution);
    pixelsSlant.addUniform("inputTexture", &images[0]);
    pixelsSlant.width = images[0].getWidth();
    pixelsSlant.height = images[0].getHeight();
    effects.push_back(pixelsSlant);
    
    Effect pixelsStep;
    pixelsStep.loadShader("Shaders/pixelsStep");
    pixelsStep.addUniform("resolution", &screenResolution);
    pixelsStep.addUniform("inputTexture", &images[0]);
    pixelsStep.width = images[0].getWidth();
    pixelsStep.height = images[0].getHeight();
    effects.push_back(pixelsStep);
    
    Effect pixelsFade;
    pixelsFade.loadShader("Shaders/pixelsFade");
    pixelsFade.addUniform("resolution", &screenResolution);
    pixelsFade.addUniform("inputTexture", &images[0]);
    pixelsFade.width = images[0].getWidth();
    pixelsFade.height = images[0].getHeight();
    effects.push_back(pixelsFade);
    
//    Effect oilPaintColor;
//    oilPaintColor.loadShader("Shaders/oilPaintColor");
//    oilPaintColor.addUniform("resolution", &screenResolution);
//    oilPaintColor.addUniform("inputTexture", &images[0]);
//    oilPaintColor.width = images[0].getWidth();
//    oilPaintColor.height = images[0].getHeight();
//    effects.push_back(oilPaintColor);
    
    Effect pixelsLegoFade;
    pixelsLegoFade.loadShader("Shaders/pixelsLegoFade");
    pixelsLegoFade.addUniform("resolution", &screenResolution);
    pixelsLegoFade.addUniform("inputTexture", &images[0]);
    pixelsLegoFade.width = images[0].getWidth();
    pixelsLegoFade.height = images[0].getHeight();
    effects.push_back(pixelsLegoFade);
    
    Effect woodWarp;
    woodWarp.loadShader("Shaders/woodWarp");
    woodWarp.addUniform("resolution", &screenResolution);
    woodWarp.addUniform("inputTexture1", &images[0]);
    woodWarp.addUniform("inputTexture2", &images[2]);
    woodWarp.width = images[0].getWidth();
    woodWarp.height = images[0].getHeight();
    effects.push_back(woodWarp);
    
    Effect woodSwirl;
    woodSwirl.loadShader("Shaders/woodSwirl");
    woodSwirl.addUniform("resolution", &screenResolution);
    woodSwirl.addUniform("inputTexture1", &images[0]);
    woodSwirl.addUniform("inputTexture2", &images[2]);
    woodSwirl.width = images[0].getWidth();
    woodSwirl.height = images[0].getHeight();
    effects.push_back(woodSwirl);
    
    Effect selfSwirl;
    selfSwirl.loadShader("Shaders/selfSwirl");
    selfSwirl.addUniform("resolution", &screenResolution);
    selfSwirl.addUniform("inputTexture", &images[0]);
    selfSwirl.width = images[0].getWidth();
    selfSwirl.height = images[0].getHeight();
    effects.push_back(selfSwirl);
    
    Effect selfWarp;
    selfWarp.loadShader("Shaders/selfWarp");
    selfWarp.addUniform("resolution", &screenResolution);
    selfWarp.addUniform("inputTexture", &images[0]);
    selfWarp.width = images[0].getWidth();
    selfWarp.height = images[0].getHeight();
    effects.push_back(selfWarp);
    
    Effect swizzleI;
    swizzleI.loadShader("Shaders/swizzleI");
    swizzleI.addUniform("resolution", &screenResolution);
    swizzleI.addUniform("inputTexture", &images[0]);
    swizzleI.width = images[0].getWidth();
    swizzleI.height = images[0].getHeight();
    effects.push_back(swizzleI);
    
    Effect cubed;
    cubed.loadShader("Shaders/cubed");
    cubed.addUniform("resolution", &screenResolution);
    cubed.addUniform("inputTexture", &images[0]);
    cubed.width = images[0].getWidth();
    cubed.height = images[0].getHeight();
    effects.push_back(cubed);
    
    Effect peak;
    peak.loadShader("Shaders/peak");
    peak.addUniform("resolution", &screenResolution);
    peak.addUniform("inputTexture", &images[0]);
    peak.width = images[0].getWidth();
    peak.height = images[0].getHeight();
    effects.push_back(peak);
    
    Effect moduloBackground;
    moduloBackground.loadShader("Shaders/moduloBackground");
    moduloBackground.addUniform("resolution", &screenResolution);
    moduloBackground.addUniform("inputTexture", &images[0]);
    moduloBackground.width = images[0].getWidth();
    moduloBackground.height = images[0].getHeight();
    effects.push_back(moduloBackground);
    
    Effect zigzag;
    zigzag.loadShader("Shaders/zigzag");
    zigzag.addUniform("resolution", &screenResolution);
    zigzag.addUniform("inputTexture", &images[0]);
    zigzag.width = images[0].getWidth();
    zigzag.height = images[0].getHeight();
    effects.push_back(zigzag);
    
    Effect zigzagX;
    zigzagX.loadShader("Shaders/zigzagX");
    zigzagX.addUniform("resolution", &screenResolution);
    zigzagX.addUniform("inputTexture", &images[0]);
    zigzagX.width = images[0].getWidth();
    zigzagX.height = images[0].getHeight();
    effects.push_back(zigzagX);
    
    Effect polarPixel;
    polarPixel.loadShader("Shaders/polarPixel");
    polarPixel.addUniform("resolution", &screenResolution);
    polarPixel.addUniform("inputTexture", &images[0]);
    polarPixel.width = images[0].getWidth();
    polarPixel.height = images[0].getHeight();
    effects.push_back(polarPixel);
    
    Effect polarPixel2;
    polarPixel2.loadShader("Shaders/polarPixel2");
    polarPixel2.addUniform("resolution", &screenResolution);
    polarPixel2.addUniform("inputTexture", &images[0]);
    polarPixel2.width = images[0].getWidth();
    polarPixel2.height = images[0].getHeight();
    effects.push_back(polarPixel2);
    
    Effect polarPixel3;
    polarPixel3.loadShader("Shaders/polarPixel3");
    polarPixel3.addUniform("resolution", &screenResolution);
    polarPixel3.addUniform("inputTexture", &images[0]);
    polarPixel3.width = images[0].getWidth();
    polarPixel3.height = images[0].getHeight();
    effects.push_back(polarPixel3);
    
    Effect lenticular;
    lenticular.loadShader("Shaders/lenticular");
    lenticular.addUniform("resolution", &screenResolution);
    lenticular.addUniform("inputTexture1", &images[0]);
    lenticular.addUniform("inputTexture2", &images[1]);
    lenticular.width = images[0].getWidth();
    lenticular.height = images[0].getHeight();
    effects.push_back(lenticular);
    
    Effect lenticularWide;
    lenticularWide.loadShader("Shaders/lenticularWide");
    lenticularWide.addUniform("resolution", &screenResolution);
    lenticularWide.addUniform("inputTexture1", &images[0]);
    lenticularWide.addUniform("inputTexture2", &images[1]);
    lenticularWide.width = images[0].getWidth();
    lenticularWide.height = images[0].getHeight();
    effects.push_back(lenticularWide);
    
    Effect lenticularX;
    lenticularX.loadShader("Shaders/lenticularX");
    lenticularX.addUniform("resolution", &screenResolution);
    lenticularX.addUniform("inputTexture1", &images[0]);
    lenticularX.addUniform("inputTexture2", &images[1]);
    lenticularX.width = images[0].getWidth();
    lenticularX.height = images[0].getHeight();
    effects.push_back(lenticularX);
    
    Effect checker;
    checker.loadShader("Shaders/checker");
    checker.addUniform("resolution", &screenResolution);
    checker.addUniform("inputTexture1", &images[0]);
    checker.addUniform("inputTexture2", &images[1]);
    checker.width = images[0].getWidth();
    checker.height = images[0].getHeight();
    effects.push_back(checker);
    
    Effect checkerNegative;
    checkerNegative.loadShader("Shaders/checkerNegative");
    checkerNegative.addUniform("resolution", &screenResolution);
    checkerNegative.addUniform("inputTexture", &images[0]);
    checkerNegative.width = images[0].getWidth();
    checkerNegative.height = images[0].getHeight();
    effects.push_back(checkerNegative);
    
    Effect opArt1;
    opArt1.loadShader("Shaders/opArt1");
    opArt1.addUniform("resolution", &screenResolution);
    opArt1.addUniform("inputTexture", &images[0]);
    opArt1.width = images[0].getWidth();
    opArt1.height = images[0].getHeight();
    effects.push_back(opArt1);
    
    Effect sinCity;
    sinCity.loadShader("Shaders/sinCity");
    sinCity.addUniform("resolution", &screenResolution);
    sinCity.addUniform("inputTexture", &images[0]);
    sinCity.width = images[0].getWidth();
    sinCity.height = images[0].getHeight();
    effects.push_back(sinCity);
    
    Effect rThresh;
    rThresh.loadShader("Shaders/rThresh");
    rThresh.addUniform("resolution", &screenResolution);
    rThresh.addUniform("inputTexture", &images[0]);
    rThresh.width = images[0].getWidth();
    rThresh.height = images[0].getHeight();
    effects.push_back(rThresh);
    
    Effect hsvMix;
    hsvMix.loadShader("Shaders/hsvMix");
    hsvMix.addUniform("resolution", &screenResolution);
    hsvMix.addUniform("inputTexture", &images[0]);
    hsvMix.width = images[0].getWidth();
    hsvMix.height = images[0].getHeight();
    effects.push_back(hsvMix);
    
    Effect redWeight;
    redWeight.loadShader("Shaders/redWeight");
    redWeight.addUniform("resolution", &screenResolution);
    redWeight.addUniform("inputTexture", &images[0]);
    redWeight.width = images[0].getWidth();
    redWeight.height = images[0].getHeight();
    effects.push_back(redWeight);
    
    Effect sobel;
    sobel.loadShader("Shaders/sobel");
    sobel.addUniform("resolution", &screenResolution);
    sobel.addUniform("inputTexture", &images[0]);
    sobel.width = images[0].getWidth();
    sobel.height = images[0].getHeight();
    effects.push_back(sobel);
    
    Effect sobelColor;
    sobelColor.loadShader("Shaders/sobelColor");
    sobelColor.addUniform("resolution", &screenResolution);
    sobelColor.addUniform("inputTexture", &images[0]);
    sobelColor.width = images[0].getWidth();
    sobelColor.height = images[0].getHeight();
    effects.push_back(sobelColor);
    
    Effect sobelStretch;
    sobelStretch.loadShader("Shaders/sobelStretch");
    sobelStretch.addUniform("resolution", &screenResolution);
    sobelStretch.addUniform("inputTexture", &images[0]);
    sobelStretch.width = images[0].getWidth();
    sobelStretch.height = images[0].getHeight();
    effects.push_back(sobelStretch);
    
    Effect sobelStretchXY;
    sobelStretchXY.loadShader("Shaders/sobelStretchXY");
    sobelStretchXY.addUniform("resolution", &screenResolution);
    sobelStretchXY.addUniform("inputTexture", &images[0]);
    sobelStretchXY.width = images[0].getWidth();
    sobelStretchXY.height = images[0].getHeight();
    effects.push_back(sobelStretchXY);
    
    Effect sobelStretchCenter;
    sobelStretchCenter.loadShader("Shaders/sobelStretchCenter");
    sobelStretchCenter.addUniform("resolution", &screenResolution);
    sobelStretchCenter.addUniform("inputTexture", &images[0]);
    sobelStretchCenter.width = images[0].getWidth();
    sobelStretchCenter.height = images[0].getHeight();
    effects.push_back(sobelStretchCenter);
    
    Effect sobelStretchY;
    sobelStretchY.loadShader("Shaders/sobelStretchY");
    sobelStretchY.addUniform("resolution", &screenResolution);
    sobelStretchY.addUniform("inputTexture", &images[0]);
    sobelStretchY.width = images[0].getWidth();
    sobelStretchY.height = images[0].getHeight();
    effects.push_back(sobelStretchY);
    
    Effect sobelNegative;
    sobelNegative.loadShader("Shaders/sobelNegative");
    sobelNegative.addUniform("resolution", &screenResolution);
    sobelNegative.addUniform("inputTexture", &images[0]);
    sobelNegative.width = images[0].getWidth();
    sobelNegative.height = images[0].getHeight();
    effects.push_back(sobelNegative);
    
    Effect sobelStretchRadial;
    sobelStretchRadial.loadShader("Shaders/sobelStretchRadial");
    sobelStretchRadial.addUniform("resolution", &screenResolution);
    sobelStretchRadial.addUniform("inputTexture", &images[0]);
    sobelStretchRadial.width = images[0].getWidth();
    sobelStretchRadial.height = images[0].getHeight();
    effects.push_back(sobelStretchRadial);
    
    Effect LogarithmicCorrection;
    LogarithmicCorrection.loadShader("Shaders/LogarithmicCorrection");
    LogarithmicCorrection.addUniform("resolution", &screenResolution);
    LogarithmicCorrection.addUniform("inputTexture", &images[0]);
    LogarithmicCorrection.width = images[0].getWidth();
    LogarithmicCorrection.height = images[0].getHeight();
    effects.push_back(LogarithmicCorrection);
    
    Effect drawingCircle;
    drawingCircle.loadShader("Shaders/drawingCircle");
    drawingCircle.addUniform("resolution", &screenResolution);
    drawingCircle.addUniform("inputTexture", &images[0]);
    drawingCircle.width = images[0].getWidth();
    drawingCircle.height = images[0].getHeight();
    effects.push_back(drawingCircle);
    
    Effect drawingLine;
    drawingLine.loadShader("Shaders/drawingLine");
    drawingLine.addUniform("resolution", &screenResolution);
    drawingLine.addUniform("inputTexture", &images[0]);
    drawingLine.width = images[0].getWidth();
    drawingLine.height = images[0].getHeight();
    effects.push_back(drawingLine);
    
    Effect HypnoTarget;
    HypnoTarget.loadShader("Shaders/HypnoTarget");
    HypnoTarget.addUniform("resolution", &screenResolution);
    HypnoTarget.addUniform("inputTexture", &images[0]);
    HypnoTarget.width = images[0].getWidth();
    HypnoTarget.height = images[0].getHeight();
    effects.push_back(HypnoTarget);
    
    Effect HypnoFan;
    HypnoFan.loadShader("Shaders/HypnoFan");
    HypnoFan.addUniform("resolution", &screenResolution);
    HypnoFan.addUniform("inputTexture", &images[0]);
    HypnoFan.width = images[0].getWidth();
    HypnoFan.height = images[0].getHeight();
    effects.push_back(HypnoFan);
    
    Effect sobelPix;
    sobelPix.loadShader("Shaders/sobelPix");
    sobelPix.addUniform("resolution", &screenResolution);
    sobelPix.addUniform("inputTexture", &images[0]);
    sobelPix.width = images[0].getWidth();
    sobelPix.height = images[0].getHeight();
    effects.push_back(sobelPix);
    
    Effect sobelPixBlocks;
    sobelPixBlocks.loadShader("Shaders/sobelPixBlocks");
    sobelPixBlocks.addUniform("resolution", &screenResolution);
    sobelPixBlocks.addUniform("inputTexture", &images[0]);
    sobelPixBlocks.width = images[0].getWidth();
    sobelPixBlocks.height = images[0].getHeight();
    effects.push_back(sobelPixBlocks);
    
    Effect colorPix;
    colorPix.loadShader("Shaders/colorPix");
    colorPix.addUniform("resolution", &screenResolution);
    colorPix.addUniform("inputTexture", &images[0]);
    colorPix.width = images[0].getWidth();
    colorPix.height = images[0].getHeight();
    effects.push_back(colorPix);
    
    Effect brightnessPix;
    brightnessPix.loadShader("Shaders/brightnessPix");
    brightnessPix.addUniform("resolution", &screenResolution);
    brightnessPix.addUniform("inputTexture", &images[0]);
    brightnessPix.width = images[0].getWidth();
    brightnessPix.height = images[0].getHeight();
    effects.push_back(brightnessPix);
    
    Effect drawingArcGrid;
    drawingArcGrid.loadShader("Shaders/drawingArcGrid");
    drawingArcGrid.addUniform("resolution", &screenResolution);
    drawingArcGrid.addUniform("inputTexture", &images[0]);
    drawingArcGrid.width = images[0].getWidth();
    drawingArcGrid.height = images[0].getHeight();
    effects.push_back(drawingArcGrid);
    
    Effect circleCrochette;
    circleCrochette.loadShader("Shaders/circleCrochette");
    circleCrochette.addUniform("resolution", &screenResolution);
    circleCrochette.addUniform("inputTexture", &images[0]);
    circleCrochette.width = images[0].getWidth();
    circleCrochette.height = images[0].getHeight();
    effects.push_back(circleCrochette);
    
    Effect circleGrid;
    circleGrid.loadShader("Shaders/circleGrid");
    circleGrid.addUniform("resolution", &screenResolution);
    circleGrid.addUniform("inputTexture", &images[0]);
    circleGrid.width = images[0].getWidth();
    circleGrid.height = images[0].getHeight();
    effects.push_back(circleGrid);
    
    Effect crossGrid;
    crossGrid.loadShader("Shaders/crossGrid");
    crossGrid.addUniform("resolution", &screenResolution);
    crossGrid.addUniform("inputTexture", &images[0]);
    crossGrid.width = images[0].getWidth();
    crossGrid.height = images[0].getHeight();
    effects.push_back(crossGrid);
    
    Effect drawingSquare;
    drawingSquare.loadShader("Shaders/drawingSquare");
    drawingSquare.addUniform("resolution", &screenResolution);
    drawingSquare.addUniform("inputTexture", &images[0]);
    drawingSquare.width = images[0].getWidth();
    drawingSquare.height = images[0].getHeight();
    effects.push_back(drawingSquare);
    
    Effect triangleGrid;
    triangleGrid.loadShader("Shaders/triangleGrid");
    triangleGrid.addUniform("resolution", &screenResolution);
    triangleGrid.addUniform("inputTexture", &images[0]);
    triangleGrid.width = images[0].getWidth();
    triangleGrid.height = images[0].getHeight();
    effects.push_back(triangleGrid);
    
    Effect quadSmudge;
    quadSmudge.loadShader("Shaders/quadSmudge");
    quadSmudge.addUniform("resolution", &screenResolution);
    quadSmudge.addUniform("inputTexture", &images[0]);
    quadSmudge.width = images[0].getWidth();
    quadSmudge.height = images[0].getHeight();
    effects.push_back(quadSmudge);
    
    Effect searchSmudge;
    searchSmudge.loadShader("Shaders/searchSmudge");
    searchSmudge.addUniform("resolution", &screenResolution);
    searchSmudge.addUniform("inputTexture", &images[0]);
    searchSmudge.width = images[0].getWidth();
    searchSmudge.height = images[0].getHeight();
    effects.push_back(searchSmudge);
    
    Effect pixelLines;
    pixelLines.loadShader("Shaders/pixelLines");
    pixelLines.addUniform("resolution", &screenResolution);
    pixelLines.addUniform("inputTexture", &images[0]);
    pixelLines.width = images[0].getWidth();
    pixelLines.height = images[0].getHeight();
    effects.push_back(pixelLines);
    
    Effect sobelLines;
    sobelLines.loadShader("Shaders/sobelLines");
    sobelLines.addUniform("resolution", &screenResolution);
    sobelLines.addUniform("inputTexture", &images[0]);
    sobelLines.width = images[0].getWidth();
    sobelLines.height = images[0].getHeight();
    effects.push_back(sobelLines);
    
    Effect droste;
    droste.loadShader("Shaders/droste");
    droste.addUniform("resolution", &screenResolution);
    droste.addUniform("inputTexture", &images[0]);
    droste.width = images[0].getWidth();
    droste.height = images[0].getHeight();
    effects.push_back(droste);
    
    Effect droste2;
    droste2.loadShader("Shaders/droste2");
    droste2.addUniform("resolution", &screenResolution);
    droste2.addUniform("inputTexture", &images[0]);
    droste2.width = images[0].getWidth();
    droste2.height = images[0].getHeight();
    effects.push_back(droste2);
    
    Effect warhol;
    warhol.loadShader("Shaders/warhol");
    warhol.addUniform("resolution", &screenResolution);
    warhol.addUniform("inputTexture", &images[0]);
    warhol.width = images[0].getWidth();
    warhol.height = images[0].getHeight();
    effects.push_back(warhol);
    
    Effect warhol2;
    warhol2.loadShader("Shaders/warhol2");
    warhol2.addUniform("resolution", &screenResolution);
    warhol2.addUniform("inputTexture", &images[0]);
    warhol2.addUniform("thresh", &thresh);
    warhol2.width = images[0].getWidth();
    warhol2.height = images[0].getHeight();
    effects.push_back(warhol2);
    
    string settingsPath = "settings/settings.xml";
    gui.setup("Effects", settingsPath);
    gui.add(effectIndex.set("Effect Index", 0, 0, effects.size()-1));
    gui.add(camOn.set("Camera On", false));
    gui.add(thresh.set("Thresh", 0.0, 0.0, 1.0));
    gui.loadFromFile(settingsPath);
    
    camOn.addListener(this, &ofApp::onCamToggle);
}

//--------------------------------------------------------------
void ofApp::update(){
    if(camOn) {
        grabber.update();
        images[0].setFromPixels(grabber.getPixels());
        images[0].mirror(false, true);
    }
}

//--------------------------------------------------------------
void ofApp::draw(){
    effects[effectIndex].applyEffect();
    ofDrawBitmapStringHighlight(effects[effectIndex].name, gui.getPosition().x + 5, gui.getPosition().y + gui.getHeight() + 15);
    gui.draw();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    if(key == OF_KEY_RIGHT) {
        effectIndex++;
        if(effectIndex >= effects.size())
            effectIndex = effects.size() - 1;
    }
    if(key == OF_KEY_LEFT) {
        effectIndex--;
        if(effectIndex < 0)
            effectIndex = 0;
    }
}

//--------------------------------------------------------------
void ofApp::onCamToggle(bool& b) {
    if(b) {
        screenResolution = ofVec2f(grabber.getWidth(), grabber.getHeight());
        for(int i =0; i < effects.size(); i++) {
            effects[i].width = grabber.getWidth();
            effects[i].height = grabber.getHeight();
        }
        ofSetWindowShape(grabber.getWidth(), grabber.getHeight());
    } else {
        images[0].load("Images/Girl_With_A_Pearl_Earring.jpg");
        screenResolution = ofVec2f(images[0].getWidth(), images[0].getHeight());
        for(int i =0; i < effects.size(); i++) {
            effects[i].width = images[0].getWidth();
            effects[i].height = images[0].getHeight();
        }
        ofSetWindowShape(images[0].getWidth(), images[0].getHeight());
    }
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){
    
}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
