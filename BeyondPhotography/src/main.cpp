#include "ofMain.h"
#include "ofApp.h"

//========================================================================
int main( ){
    ofGLFWWindowSettings settings;
    settings.width = 1080;
    settings.height = 540;
    settings.decorated = true;
    settings.setPosition(ofVec2f(0, 0));
    settings.windowMode = OF_WINDOW;
    
    ofCreateWindow(settings);
//    ofSetupOpenGL(1080,540,OF_WINDOW);            // <-------- setup the GL context

	// this kicks off the running of my app
	// can be OF_WINDOW or OF_FULLSCREEN
	// pass in width and height too:
	ofRunApp(new ofApp());

}
