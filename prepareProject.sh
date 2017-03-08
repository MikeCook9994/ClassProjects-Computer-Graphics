#!/bin/bash

#check the parameter count
if [[ $# -ne 2 ]]; then
    printf "usage: ./webgl-utils -[csl] [dir] \n\t'c' -- compile shaders to javascript file\n\t's' -- secure copy to csl\n\t'l' -- convert the provided object files to a json file\n\tdir -- the directory containing files you want to operate on\n"
fi

if [[ $1 == *"c"* ]]; then
    echo "copmiling shaders to javascript"
fi

# secure copy directory specified to csl machine
if [[ $1 == *"s"* ]]; then
    echo "copying project to csl"
    scp -r $2 cook@best-linux.cs.wisc.edu:/u/c/o/cook/public/html/cs559/
fi

if [[ $1 == *"l"* ]]; then
    echo "generating json from object file"
fi