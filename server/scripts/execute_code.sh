
// execute_code.sh
#!/bin/bash

LANGUAGE=$1
CODE_FILE=$2
INPUT_FILE=$3

TIMEOUT=3

execute_with_timeout() {
  timeout $TIMEOUT bash -c "$1"
  if [ $? -eq 124 ]; then
    echo "Execution timed out"
    exit 1
  fi
}

echo "Executing: $LANGUAGE - $CODE_FILE with input $INPUT_FILE" >> /usr/src/app/logs.txt

case "$LANGUAGE" in
  "c")
    gcc "$CODE_FILE" -o output && execute_with_timeout "./output < \"$INPUT_FILE\""
    ;;
  "cpp")
    g++ "$CODE_FILE" -o output && execute_with_timeout "./output < \"$INPUT_FILE\""
    ;;
  "python")
    execute_with_timeout "python3 \"$CODE_FILE\" < \"$INPUT_FILE\""
    ;;
  "javascript")
    execute_with_timeout "node \"$CODE_FILE\" < \"$INPUT_FILE\""
    ;;
  "java")
    JAVA_DIR=$(dirname "$CODE_FILE")
    CLASS_NAME=$(basename "$CODE_FILE" .java)
    javac "$CODE_FILE" && execute_with_timeout "java -cp \"$JAVA_DIR\" \"$CLASS_NAME\" < \"$INPUT_FILE\""
    ;;
  *)
    echo "Unsupported language"
    exit 1
    ;;
esac