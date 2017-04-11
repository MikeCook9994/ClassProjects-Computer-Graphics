function Uniform(name, isMatrix, glCopyUniformFunction, location) {
    this.name = name;
    this.isMatrix = isMatrix;
    this.glCopyUniformFunction = glCopyUniformFunction;
    this.location = null || location;
    this.value = null;

}