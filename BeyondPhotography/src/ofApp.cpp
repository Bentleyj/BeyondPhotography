#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    // Load images
    ofxNestedFileLoader loader;
    vector<string> imagePaths = loader.load("Images");
    for(int i = 0; i < imagePaths.size(); i++) {
        ofImage img;
        img.load(imagePaths[i]);
        images.push_back(img);
    }
    imageIndex.set("Image Index", 0, 0, images.size()-1);
    
    screenResolution.x = ofGetWidth();
    screenResolution.y = ofGetHeight();
    
    Effect test;
    test.loadShader("Shaders/test");
    test.addUniform("inputTexture", &images[0]);
    test.addUniform("resolution", &screenResolution);
    test.width = ofGetWidth();
    test.height = ofGetHeight();
    effects.push_back(test);
    
    Effect diagonal;
    diagonal.loadShader("Shaders/diagonal");
    diagonal.addUniform("resolution", &screenResolution);
    diagonal.width = ofGetWidth();
    diagonal.height = ofGetHeight();
    effects.push_back(diagonal);
    
    Effect modulo;
    modulo.loadShader("Shaders/modulo");
    modulo.addUniform("resolution", &screenResolution);
    modulo.width = ofGetWidth();
    modulo.height = ofGetHeight();
    effects.push_back(modulo);
    
    Effect sine;
    sine.loadShader("Shaders/sine");
    sine.addUniform("resolution", &screenResolution);
    sine.width = ofGetWidth();
    sine.height = ofGetHeight();
    effects.push_back(sine);
    
    Effect atan;
    atan.loadShader("Shaders/atan");
    atan.addUniform("resolution", &screenResolution);
    atan.width = ofGetWidth();
    atan.height = ofGetHeight();
    effects.push_back(atan);
    
    Effect cond1;
    cond1.loadShader("Shaders/cond1");
    cond1.addUniform("resolution", &screenResolution);
    cond1.width = ofGetWidth();
    cond1.height = ofGetHeight();
    effects.push_back(cond1);
    
    Effect cond2;
    cond2.loadShader("Shaders/cond2");
    cond2.addUniform("resolution", &screenResolution);
    cond2.width = ofGetWidth();
    cond2.height = ofGetHeight();
    effects.push_back(cond2);
    
    Effect pol1;
    pol1.loadShader("Shaders/pol1");
    pol1.addUniform("resolution", &screenResolution);
    pol1.width = ofGetWidth();
    pol1.height = ofGetHeight();
    effects.push_back(pol1);
    
    Effect spiral;
    spiral.loadShader("Shaders/spiral");
    spiral.addUniform("resolution", &screenResolution);
    spiral.width = ofGetWidth();
    spiral.height = ofGetHeight();
    effects.push_back(spiral);
    
    Effect negative;
    negative.loadShader("Shaders/negative");
    negative.addUniform("resolution", &screenResolution);
    negative.addUniform("inputTexture", &images[0]);
    negative.width = ofGetWidth();
    negative.height = ofGetHeight();
    effects.push_back(negative);
    
    Effect solarize;
    solarize.loadShader("Shaders/solarize");
    solarize.addUniform("resolution", &screenResolution);
    solarize.addUniform("inputTexture", &images[0]);
    solarize.width = ofGetWidth();
    solarize.height = ofGetHeight();
    effects.push_back(solarize);
    
    Effect solarizeFade;
    solarizeFade.loadShader("Shaders/solarizeFade");
    solarizeFade.addUniform("resolution", &screenResolution);
    solarizeFade.addUniform("inputTexture", &images[0]);
    solarizeFade.width = ofGetWidth();
    solarizeFade.height = ofGetHeight();
    effects.push_back(solarizeFade);
    
    Effect blur;
    blur.loadShader("Shaders/blur");
    blur.addUniform("resolution", &screenResolution);
    blur.addUniform("inputTexture", &images[0]);
    blur.width = ofGetWidth();
    blur.height = ofGetHeight();
    effects.push_back(blur);
    
    Effect sharpen;
    sharpen.loadShader("Shaders/sharpen");
    sharpen.addUniform("resolution", &screenResolution);
    sharpen.addUniform("inputTexture", &images[0]);
    sharpen.width = ofGetWidth();
    sharpen.height = ofGetHeight();
    effects.push_back(sharpen);
    
    Effect relief;
    relief.loadShader("Shaders/relief");
    relief.addUniform("resolution", &screenResolution);
    relief.addUniform("inputTexture", &images[0]);
    relief.width = ofGetWidth();
    relief.height = ofGetHeight();
    effects.push_back(relief);
    
    Effect mirrorY;
    mirrorY.loadShader("Shaders/mirrorY");
    mirrorY.addUniform("resolution", &screenResolution);
    mirrorY.addUniform("inputTexture", &images[0]);
    mirrorY.width = ofGetWidth();
    mirrorY.height = ofGetHeight();
    effects.push_back(mirrorY);
    
    Effect rotate90;
    rotate90.loadShader("Shaders/rotate90");
    rotate90.addUniform("resolution", &screenResolution);
    rotate90.addUniform("inputTexture", &images[0]);
    rotate90.width = ofGetWidth();
    rotate90.height = ofGetHeight();
    effects.push_back(rotate90);
    
    Effect stretchX;
    stretchX.loadShader("Shaders/stretchX");
    stretchX.addUniform("resolution", &screenResolution);
    stretchX.addUniform("inputTexture", &images[0]);
    stretchX.width = ofGetWidth();
    stretchX.height = ofGetHeight();
    effects.push_back(stretchX);
    
    Effect shrink;
    shrink.loadShader("Shaders/shrink");
    shrink.addUniform("resolution", &screenResolution);
    shrink.addUniform("inputTexture", &images[0]);
    shrink.width = ofGetWidth();
    shrink.height = ofGetHeight();
    effects.push_back(shrink);
    
    Effect mirrorX;
    mirrorX.loadShader("Shaders/mirrorX");
    mirrorX.addUniform("resolution", &screenResolution);
    mirrorX.addUniform("inputTexture", &images[0]);
    mirrorX.width = ofGetWidth();
    mirrorX.height = ofGetHeight();
    effects.push_back(mirrorX);
    
    Effect mirrorX2;
    mirrorX2.loadShader("Shaders/mirrorX2");
    mirrorX2.addUniform("resolution", &screenResolution);
    mirrorX2.addUniform("inputTexture", &images[0]);
    mirrorX2.width = ofGetWidth();
    mirrorX2.height = ofGetHeight();
    effects.push_back(mirrorX2);
    
    Effect blend;
    blend.loadShader("Shaders/blend");
    blend.addUniform("resolution", &screenResolution);
    blend.addUniform("inputTexture1", &images[1]);
    blend.addUniform("inputTexture2", &images[2]);
    blend.width = ofGetWidth();
    blend.height = ofGetHeight();
    effects.push_back(blend);
    
    Effect blendLinear;
    blendLinear.loadShader("Shaders/blendLinear");
    blendLinear.addUniform("resolution", &screenResolution);
    blendLinear.addUniform("inputTexture1", &images[1]);
    blendLinear.addUniform("inputTexture2", &images[2]);
    blendLinear.width = ofGetWidth();
    blendLinear.height = ofGetHeight();
    effects.push_back(blendLinear);
    
    Effect blendCenter;
    blendCenter.loadShader("Shaders/blendCenter");
    blendCenter.addUniform("resolution", &screenResolution);
    blendCenter.addUniform("inputTexture1", &images[1]);
    blendCenter.addUniform("inputTexture2", &images[2]);
    blendCenter.width = ofGetWidth();
    blendCenter.height = ofGetHeight();
    effects.push_back(blendCenter);
    
    Effect blendBrightness;
    blendBrightness.loadShader("Shaders/blendBrightness");
    blendBrightness.addUniform("resolution", &screenResolution);
    blendBrightness.addUniform("inputTexture1", &images[1]);
    blendBrightness.addUniform("inputTexture2", &images[2]);
    blendBrightness.width = ofGetWidth();
    blendBrightness.height = ofGetHeight();
    effects.push_back(blendBrightness);
    
    Effect blendBrightnessSmooth;
    blendBrightnessSmooth.loadShader("Shaders/blendBrightnessSmooth");
    blendBrightnessSmooth.addUniform("resolution", &screenResolution);
    blendBrightnessSmooth.addUniform("inputTexture1", &images[1]);
    blendBrightnessSmooth.addUniform("inputTexture2", &images[2]);
    blendBrightnessSmooth.width = ofGetWidth();
    blendBrightnessSmooth.height = ofGetHeight();
    effects.push_back(blendBrightnessSmooth);
    
    Effect sinStretch;
    sinStretch.loadShader("Shaders/sinStretch");
    sinStretch.addUniform("resolution", &screenResolution);
    sinStretch.addUniform("inputTexture", &images[0]);
    sinStretch.width = ofGetWidth();
    sinStretch.height = ofGetHeight();
    effects.push_back(sinStretch);
    
    Effect cone;
    cone.loadShader("Shaders/cone");
    cone.addUniform("resolution", &screenResolution);
    cone.addUniform("inputTexture", &images[0]);
    cone.width = ofGetWidth();
    cone.height = ofGetHeight();
    effects.push_back(cone);
    
    Effect shear;
    shear.loadShader("Shaders/shear");
    shear.addUniform("resolution", &screenResolution);
    shear.addUniform("inputTexture", &images[0]);
    shear.width = ofGetWidth();
    shear.height = ofGetHeight();
    effects.push_back(shear);
    
    Effect Bentley;
    Bentley.loadShader("Shaders/Bentley");
    Bentley.addUniform("resolution", &screenResolution);
    Bentley.addUniform("inputTexture", &images[0]);
    Bentley.width = ofGetWidth();
    Bentley.height = ofGetHeight();
    effects.push_back(Bentley);
    
    Effect BentleyRand;
    BentleyRand.loadShader("Shaders/BentleyRand");
    BentleyRand.addUniform("resolution", &screenResolution);
    BentleyRand.addUniform("inputTexture", &images[0]);
    BentleyRand.width = ofGetWidth();
    BentleyRand.height = ofGetHeight();
    effects.push_back(BentleyRand);
    
    Effect Melt;
    Melt.loadShader("Shaders/Melt");
    Melt.addUniform("resolution", &screenResolution);
    Melt.addUniform("inputTexture", &images[0]);
    Melt.width = ofGetWidth();
    Melt.height = ofGetHeight();
    effects.push_back(Melt);
    
    string settingsPath = "settings/settings.xml";
    gui.setup("Effects", settingsPath);
    gui.add(imageIndex);
    gui.add(effectIndex.set("Effect Index", 0, 0, effects.size()-1));
    gui.loadFromFile(settingsPath);
    
}

//--------------------------------------------------------------
void ofApp::update(){
    
}

//--------------------------------------------------------------
void ofApp::draw(){
//    for(int i = 0; i < effects.size(); i++) {
//        if(
//    }
    effects[effectIndex].applyEffect();
    ofDrawBitmapStringHighlight(effects[effectIndex].name, gui.getPosition().x, gui.getPosition().y + gui.getHeight() + 10);
    gui.draw();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

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
    screenResolution.x = w;
    screenResolution.y = h;
}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
