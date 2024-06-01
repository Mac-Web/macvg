precision mediump float;
varying vec2 vTextureCoord;
varying vec2 vTextureCoord_B;

uniform sampler2D Texture0;
uniform sampler2D Texture1;
uniform vec4 uColors;


void main(void) 
{
	vec4 textureColorA = texture2D(Texture0, vTextureCoord.st)* uColors; 
	textureColorA *= texture2D(Texture1, vTextureCoord_B.st).r;

       gl_FragColor = textureColorA;
}
