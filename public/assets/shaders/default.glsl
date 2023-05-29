#type vertex
#version 300 es

layout (location=0) in vec2 aPos;
layout (location=1) in vec4 aColor;
layout (location=2) in vec2 aTexCoords;
layout (location=3) in float aTexIndex;

uniform mat4 uProjection;
uniform mat4 uView;
uniform float uTime;
uniform vec2 uResolution;

out vec4 fColor;
out vec2 fTexCoords;
out float fTexIndex;
out float fAspectRatio;

void main(){
    fAspectRatio = uResolution.x / uResolution.y;
    fColor = aColor;
    fTexCoords = aTexCoords;
    fTexIndex = aTexIndex;
    //incorporate aspect ratio into projection matrix
    mat4 projection = uProjection;
    if(fAspectRatio > 1.0){
        projection[0][0] = projection[0][0] * fAspectRatio;
    }else{
        projection[1][1] = projection[1][1] / fAspectRatio;
    }
    vec4 position = projection * uView * vec4(aPos, 0.0, 1.0);
    
    gl_Position = position;
}

#type fragment
#version 300 es
#define numTextures 8
precision mediump float;

in vec4 fColor;
in vec2 fTexCoords;
in float fTexIndex;

uniform sampler2D uTextures[numTextures];

out vec4 color;

vec4 getTexColor(int index, vec2 coords){
    vec4 c = vec4(0.0);
    if(index == 0){
        c += texture(uTextures[0], coords);
    }else if(index == 1){
        c += texture(uTextures[1], coords);
    }else if(index == 2){
        c += texture(uTextures[2], coords);
    }else if(index == 3){
        c += texture(uTextures[3], coords);
    }else if(index == 4){
        c += texture(uTextures[4], coords);
    }else if(index == 5){
        c += texture(uTextures[5], coords);
    }else if(index == 6){
        c += texture(uTextures[6], coords);
    }else if(index == 7){
        c += texture(uTextures[7], coords);
    }
    return c;
}

void main(){
    if(fTexIndex == 0.0){
        color = fColor;
        return;
    }
    color =  fColor * getTexColor(int(fTexIndex), fTexCoords);
}