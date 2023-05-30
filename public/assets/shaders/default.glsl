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
 
    vec4 position = projection * uView * vec4(aPos, 0.0, 1.0);
    
    gl_Position = position;
}

#type fragment
#version 300 es
#define numTextures 16
precision highp float;

in vec4 fColor;
in vec2 fTexCoords;
in float fTexIndex;

uniform sampler2D uTextures[numTextures];

out vec4 color;

vec4 getTexColor(int index, vec2 coords){
    if(index == 0){
        return texture(uTextures[0], coords);
    }else if(index == 1){
        return texture(uTextures[1], coords);
    }else if(index == 2){
        return texture(uTextures[2], coords);
    }else if(index == 3){
        return texture(uTextures[3], coords);
    }else if(index == 4){
        return texture(uTextures[4], coords);
    }else if(index == 5){
        return texture(uTextures[5], coords);
    }else if(index == 6){
        return texture(uTextures[6], coords);
    }else if(index == 7){
        return texture(uTextures[7], coords);
    }else if(index == 8){
        return texture(uTextures[8], coords);
    }else if(index == 9){
        return texture(uTextures[9], coords);
    }else if(index == 10){
        return texture(uTextures[10], coords);
    }else if(index == 11){
        return texture(uTextures[11], coords);
    }else if(index == 12){
        return texture(uTextures[12], coords);
    }else if(index == 13){
        return texture(uTextures[13], coords);
    }else if(index == 14){
        return texture(uTextures[14], coords);
    }else if(index == 15){
        return texture(uTextures[15], coords);
    }
}

void main(){
    if(fTexIndex == 0.0){
        color = fColor;
        return;
    }
    color =  fColor * getTexColor(int(fTexIndex), fTexCoords);
}