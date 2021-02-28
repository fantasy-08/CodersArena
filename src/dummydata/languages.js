const langOp = [
	["c", 6],
	["cpp", 7],
	["java", 4],
	["python", 5],
	["C#", 1],
	["php", 8],
	["ruby", 12],
	["javascript", 17]
];

const template = {
	cpp: `/******************************************************************************
Welcome to Boring Coder.
Hello Friends coding kar lo!
*******************************************************************************/

#include <bits/stdc++.h>
using namespace std;

int main()
{
    printf("Hello World");

    return 0;
}
`,
};

const compilerArg_exp = {
	cpp:
		"-Wall -std=c++11 -O2 -o a.out source_file.cpp -lboost_thread -lboost_system",
	python: "",
};

export { langOp, template, compilerArg_exp };

