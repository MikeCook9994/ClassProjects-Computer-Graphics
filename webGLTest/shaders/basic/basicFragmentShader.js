let basicFragmentShader =
`precision highp float;

varying vec3 fColor;

void main(void) {      
    gl_FragColor = vec4(fColor, 1.0);
}`
