#!/bin/bash

LANGUAGE=$1
CODE_FILE=$2

case "$LANGUAGE" in
  "c")
    gcc "$CODE_FILE" -o output && ./output
    ;;
  "cpp")
    g++ "$CODE_FILE" -o output && ./output
    ;;
  "python")
    python3 "$CODE_FILE"
    ;;
  "javascript")
    node "$CODE_FILE"
    ;;
  "java")
    javac "$CODE_FILE" && java ${CODE_FILE%.*}
    ;;
  *)
    echo "Unsupported language"
    exit 1
    ;;
esac
