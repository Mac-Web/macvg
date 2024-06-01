attribute vec3 aVertexPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;
uniform mat4 CamMatrix;
 
varying vec4 MyColor;
uniform vec4 uColors;

void main(void) 
{
vec3  NVertexPosition	 = aVertexPosition;
NVertexPosition.z += NVertexPosition.y* uColors.a;
NVertexPosition.x -= NVertexPosition.y* uColors.a*0.5;
NVertexPosition.y = 0.0;

MyColor = uColors;
MyColor.a = 1.0;

vec4 mvPosition = uMVMatrix * vec4(NVertexPosition, 1.0);
gl_Position = uPMatrix * mvPosition;
}