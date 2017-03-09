#!/bin/bash

function createJavascriptFile () {
    contents=$(cat "$0")

    filename=$(basename "$0" | cut -d"." -f 1 | tr -d " ")
    jsVarDeclaration="let "
    type=""
    if [[ $0 == *".vert" ]]; then
        type="VertexShader"
        jsVarDeclaration="$jsVarDeclaration$filename$type"
    else
        type="FragmentShader"
        jsVarDeclaration="$jsVarDeclaration$filename$type"
    fi
    # defines the contents of the file to be written out as a js file
    jsContents="$jsVarDeclaration"' =
`'"$contents"'`
'
    echo "$jsContents" > $filename$type".js"
}
export -f createJavascriptFile

#check the parameter count
if [[ $# -ne 2 ]]; then
    printf "usage: ./webgl-utils -[csl] [dir] \n\t'c' -- compile shaders to javascript file\n\t's' -- secure copy to csl\n\t'l' -- convert the provided object files to a json file\n\tdir -- the directory containing files you want to operate on\n"
fi

# "compiles" a glsl shader to a javascript file
if [[ $1 == *"c"* ]]; then
    echo "compiling shaders to javascript"
    cd $2
    find -regex ".*\.\(vert\|frag\)" -exec bash -c 'createJavascriptFile "$0"' {} \;
    cd ..
fi

# secure copy directory specified to csl machine
if [[ $1 == *"s"* ]]; then
    echo "copying project to csl"
    scp -r $2 cook@best-linux.cs.wisc.edu:/u/c/o/cook/public/html/cs559/
fi

# generate json from wavefront object file
if [[ $1 == *"l"* ]]; then
    echo "generating json from object file"
fi