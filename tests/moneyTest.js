//$ in this folder we are gonna test functions 

//? there is 2 ways of testing 
// 1. manual testing
// 2. automated testing 

//# manual testing is basicly trying it out by yourself in the website 

//# automated testing is using code to test the code 

import { formatCurrency } from "../scripts/utils/money.js";

console.log("test suite: formatCurrency");  //? groupe of related tests are called a test suite

console.log("convert cents into dollars"); //? name of the test case 

if(formatCurrency(2095) === "20.95") {  //? this is called a test case 
    console.log("pass");
}
else {
    console.log("fail");
};

console.log("works with 0");

if (formatCurrency(0) === "0.00") {  //? this is another test case
    console.log("pass");
} else {
    console.log("fail");
};

console.log("works with decimal values");

if (formatCurrency(2000.5) === "20.01") {
    console.log("pass");
} else {
    console.log("fail");
};

console.log("works with decimal values");

if (formatCurrency(2000.4) === "20.00") {
    console.log("pass");
} else {
    console.log("fail");
};

//# when testing you have two test cases
// 1. basic test case

// 2. edge case
//? basic test case is testing if the code works as expected
//? edge case is testing if the code works with tricky values