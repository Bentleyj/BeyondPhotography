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
    
    resolution.x = ofGetWidth();
    resolution.y = ofGetHeight();
    
    Effect e;
    e.loadShader("Shaders/test");
    e.addUniform("inputTexture", &images[0]);
    e.addUniform("resolution", &resolution);
    e.width = ofGetWidth();
    e.height = ofGetHeight();
    effects.push_back(e);
    
}

//--------------------------------------------------------------
void ofApp::update(){
    
}

//--------------------------------------------------------------
void ofApp::draw(){
    effects[0].applyEffect();
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
    resolution.x = w;
    resolution.y = h;
}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
