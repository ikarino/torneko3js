#!/bin/sh
inputs=(
  "fuck.json"
  "invalidJson.json"
  "noFriends.json"
  "notSCSInput.json"
  "overWriteTest.json"
)

for i in ${inputs[@]}
do
  echo "-----------------------"
  echo $i
  cat example/inputs/$i
  npx ts-node src/bin/scs.ts -i example/inputs/$i
done