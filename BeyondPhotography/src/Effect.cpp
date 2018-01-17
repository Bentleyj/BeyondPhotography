//
//  Effect.cpp
//  BeyondPhotography
//
//  Created by cafe on 16/01/2018.
//

#include "Effect.hpp"

Effect::Effect() {
    
}

void Effect::loadShader(string shaderPath) {
    shader.load(shaderPath);
    name = ofSplitString(shaderPath, ".")[0];
    int s = ofSplitString(name, "/").size();
    name = ofSplitString(name, "/")[s-1];
    
    button.set(name, false);
}
    
void Effect::applyEffect() {
    shader.begin();
    // Set the floats
    for(int i = 0; i < uniformFloats.size(); i++) {
        shader.setUniform1f(uniformFloats[i].first, *uniformFloats[i].second);
    }
    // set the Vec2fs
    for(int i = 0; i < uniformVec2fs.size(); i++) {
        shader.setUniform2f(uniformVec2fs[i].first, uniformVec2fs[i].second->x, uniformVec2fs[i].second->y);
    }
    // set the Vec3fs
    for(int i = 0; i < uniformVec3fs.size(); i++) {
        shader.setUniform3f(uniformVec3fs[i].first, uniformVec3fs[i].second->x, uniformVec3fs[i].second->y, uniformVec3fs[i].second->z);
    }
    // set the Vec4fs
    for(int i = 0; i < uniformVec4fs.size(); i++) {
        shader.setUniform4f(uniformVec4fs[i].first, uniformVec4fs[i].second->x, uniformVec4fs[i].second->y, uniformVec4fs[i].second->z, uniformVec4fs[i].second->w);
    }
    // set the Textures
    int numTextures = 0;
    for(int i = 0; i < uniformTextures.size(); i++) {
        shader.setUniformTexture(uniformTextures[i].first, *uniformTextures[i].second, i);
        numTextures++;
    }
    // set the BaseHasTextures
    for(int i = 0; i < uniformBaseHasTextures.size(); i++) {
        shader.setUniformTexture(uniformBaseHasTextures[i].first, uniformBaseHasTextures[i].second->getTexture(), numTextures + i);
    }
    ofDrawRectangle(0, 0, width, height);
    
    shader.end();
}

void Effect::addUniform(string s, float* f) {
    for(int i = 0; i < uniformFloats.size(); i++) {
        if(uniformFloats[i].first == s) {
            uniformFloats[i].second = f;
            return;
        }
    }
    uniformFloats.push_back(make_pair(s, f));
}

void Effect::addUniform(string s, ofVec2f* f) {
    for(int i = 0; i < uniformVec2fs.size(); i++) {
        if(uniformVec2fs[i].first == s) {
            uniformVec2fs[i].second = f;
            return;
        }
    }
    uniformVec2fs.push_back(make_pair(s, f));
}

void Effect::addUniform(string s, ofVec3f* f) {
    for(int i = 0; i < uniformVec3fs.size(); i++) {
        if(uniformVec3fs[i].first == s) {
            uniformVec3fs[i].second = f;
            return;
        }
    }
    uniformVec3fs.push_back(make_pair(s, f));
}

void Effect::addUniform(string s, ofVec4f* f) {
    for(int i = 0; i < uniformVec4fs.size(); i++) {
        if(uniformVec4fs[i].first == s) {
            uniformVec4fs[i].second = f;
            return;
        }
    }
    uniformVec4fs.push_back(make_pair(s, f));
}

void Effect::addUniform(string s, ofTexture* f) {
    for(int i = 0; i < uniformTextures.size(); i++) {
        if(uniformTextures[i].first == s) {
            uniformTextures[i].second = f;
            return;
        }
    }
    uniformTextures.push_back(make_pair(s, f));
}

void Effect::addUniform(string s, ofBaseHasTexture* f) {
    for(int i = 0; i < uniformBaseHasTextures.size(); i++) {
        if(uniformBaseHasTextures[i].first == s) {
            uniformBaseHasTextures[i].second = f;
            return;
        }
    }
    uniformBaseHasTextures.push_back(make_pair(s, f));
}


