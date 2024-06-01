attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;
uniform mat4 CamMatrix;
 
varying vec2 vTextureCoord;

void main(void) 
{
	vec4 mvPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
        gl_Position = uPMatrix * mvPosition;
        vTextureCoord = aTextureCoord;
}