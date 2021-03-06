const langOp = [
  ["c", 6],
  ["cpp", 7],
  ["java", 4],
  ["python", 5],
  ["C#", 1],
  ["php", 8],
  ["ruby", 12],
  ["javascript", 17],
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
  python: `
#Welcome to Boring Coder.

print('Hello world')
`,
  javascript: `
//Welcome to Boring Coder.

console.log('Hello world')
`,
  java: `
public class Main
{
	public static void main(String[] args) {
		System.out.println("Hello World");
	}
}
`,
};

const compilerArg_exp = {
  cpp: "-Wall -std=c++11 -O2 -o a.out source_file.cpp -lboost_thread -lboost_system",
  python: "",
};

const Playground = {
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
	
</body>
</html>`,
  javascript: "console.log('hello')",
};
export { langOp, template, compilerArg_exp, Playground };
