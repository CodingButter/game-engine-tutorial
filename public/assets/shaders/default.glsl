#type vertex
#version 300 es

layout (location=0) in vec2 aPos;
layout (location=1) in vec4 aColor;

uniform mat4 uProjection;
uniform mat4 uView;
uniform float uTime;

out vec4 fColor;

void main(){
    fColor = aColor;
    vec4 position = uProjection * uView * vec4(aPos,0.0, 1.0);
    gl_Position = position;
}

#type fragment
#version 300 es
precision highp float;

in vec4 fColor;
out vec4 color;

void main(){
    color =  fColor;
}