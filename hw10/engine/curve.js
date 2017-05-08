let hermiteBasisMatrix = 
    [[1,  0,  0,  0],
     [0,  1,  0,  0],
    [-3, -2,  3, -1],
     [2,  1, -2,  1]];

let bezierBasisMatrix = 
    [[1,  0,  0,  0],
    [-3,  3,  0,  0],
     [3, -6,  3,  0],
    [-1,  3, -3,  1]];

function Curve(basis, controlPoints) {
    this.basis = basis;
    this.controlPoints = controlPoints;

    this.ResolveBlendingFunctions = ((u) => {
        let parameterVector = [1, u, u**2, u**3];
        let transposedBasis = transpose(this.basis);
        return [dot(parameterVector, transposedBasis[0]), dot(parameterVector, transposedBasis[1]), dot(parameterVector, transposedBasis[2]), dot(parameterVector, transposedBasis[3])];
    });

    this.ResolveBlendingPrimeFunctions = ((u, basis) => {
        let parameterVectorPrime = [0, 1, 2 * u, 3 * (u**2)];
        let transposedBasis = transpose(this.basis);
        return [dot(parameterVectorPrime, transposedBasis[0]), dot(parameterVectorPrime, transposedBasis[1]), dot(parameterVectorPrime, transposedBasis[2]), dot(parameterVectorPrime, transposedBasis[3])];
    });
}

Curve.prototype.GetTranslation = function(t) {
    let uB = this.ResolveBlendingFunctions(NormalizeValue(t));
    if(Math.trunc(t) == t && t != 0) {
        t -= 1;
    }
    let transposedCurveControlPoints = transpose(this.controlPoints[Math.trunc(t)]);
    return m4.translation([dot(uB, transposedCurveControlPoints[0]), dot(uB, transposedCurveControlPoints[1]), dot(uB, transposedCurveControlPoints[2])]);
}

Curve.prototype.GetRotation = function(t) {
    let uB = this.ResolveBlendingPrimeFunctions(NormalizeValue(t));
    if(Math.trunc(t) == t && t != 0) {
        t -= 1;
    }
    let transposedCurveControlPoints = transpose(this.controlPoints[Math.trunc(t)]);
    return m4.lookAt([0,0,0], [dot(uB, transposedCurveControlPoints[0]), dot(uB, transposedCurveControlPoints[1]), dot(uB, transposedCurveControlPoints[2])], [0, 1, 0]);
}

function NormalizeValue(t) {
    // this gives a value between 0 and 1 by extracting the whole part. Or reducing a whole number with no fractional part to 1.0. Or returning 0.0.
    return ((Math.trunc(t) == t) ? (((t == 0.0) ? (0.0) : (1.0))) : (t - Math.trunc(t))); 
}