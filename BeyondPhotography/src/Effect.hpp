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
    
    
};

#endif /* Effect_hpp */
