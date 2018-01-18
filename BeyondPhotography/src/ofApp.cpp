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
    
    string settingsPath = "settings/settings.xml";
    gui.setup("Effects", settingsPath);
    gui.add(imageIndex);
    gui.add(effectIndex.set("Effect Index", 0, 0, effects.size()-1));
    //gui.add(e.button);
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
