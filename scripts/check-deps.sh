#!/bin/bash

deps=()
while IFS= read -r line; do
  if [[ $line =~ \"(.*)\":\ \"(.*)\" ]]; then
    deps+=("${BASH_REMATCH[2]}")
  fi
done < ./package.json

regex='^[~^]'

for dep in "${deps[@]}"; do
  if [[ $dep =~ $regex ]]; then
    echo -e "\033[1;31m^ e ~ não são permitidos no package.json\033[0m\n"
    exit 1
  fi
done