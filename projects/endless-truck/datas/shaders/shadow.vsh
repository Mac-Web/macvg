attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;
uniform mat4 CamMatrix;

varying vec2 vTextureCoord;
varying vec2 vTextureCoord_B;

void main(void) 
{
	vec4 mvPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
        gl_Position = uPMatrix* CamMatrix * mvPosition;

	vTextureCoord_B.st = mvPosition.xz*0.000138;
	vTextureCoord_B.s +=0.5+mvPosition.y*0.0001;
	vTextureCoord_B.t =0.5-vTextureCoord_B.t;


        vTextureCoord = aTextureCoord;
}