precision mediump float;
varying vec2 vTextureCoord;

uniform sampler2D Texture0;
uniform vec4 uColors;

void main(void) 
{
	vec4 textureColor = texture2D(Texture0, vTextureCoord.st);
        gl_FragColor = textureColor*uColors;
}
