attribute vec3 aVertexPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;
uniform mat4 CamMatrix;
 

void main(void) 
{
	vec4 mvPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
        gl_Position = uPMatrix * mvPosition;
}