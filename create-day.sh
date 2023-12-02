#!/bin/bash

re='^[0-9]+$'
if ! [[ $1 =~ $re ]]; then
	echo "Input a day number and try again." >&2
	exit 1
fi

mkdir day$1
tar -xf part-template.gz
mv part1/ day$1/part1/
cd day$1/part1/
bun i
