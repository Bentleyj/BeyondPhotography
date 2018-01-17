//
//  Effect.hpp
//  BeyondPhotography
//
//  Created by cafe on 16/01/2018.
//

#ifndef Effect_hpp
#define Effect_hpp

#include "ofMain.h"

class Effect {
public:
    Effect();
    void addUniform(string s, float* f);
    void addUniform(string s, ofTexture* tex);
    void addUniform(string s, ofVec2f* v);
    void addUniform(string s, ofBaseHasTexture* tex);
    void addUniform(string s, ofVec4f* v);
    void addUniform(string s, ofVec3f* v);
    void loadShader(string shaderPath);
    
    void applyEffect();
    
    vector< pair<string, float*> > uniformFloats;
    vector< pair<string, ofTexture*> > uniformTextures;
    vector< pair<string, ofVec2f*> > uniformVec2fs;
    vector< pair<string, ofVec3f*> > uniformVec3fs;
    vector< pair<string, ofVec4f*> > uniformVec4fs;
    vector< pair<string, ofBaseHasTexture*> > uniformBaseHasTextures;
    
    ofShader shader;
    string name;
    float width;
    float height;
    
    ofParameter<bool> button;
    
    
};

#endif /* Effect_hpp */
