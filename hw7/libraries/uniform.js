function Uniform(name, isMatrix, glCopyUniformFunction) {
    this.name = name;
    this.isMatrix = isMatrix;
    this.glCopyUniformFunction = glCopyUniformFunction;
    this.value = null;
    this.location = null;
}