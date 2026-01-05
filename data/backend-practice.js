//# XMLHttpRequest is a built-in object that allows you to make HTTP requests to a server.
//? request is the message that is sent to the server.
//? response is the message that is received from the server.
const xhr = new XMLHttpRequest(); 

xhr.addEventListener('load', () => { //$ this is a callback function (a function that is called when the event happens)
    console.log(xhr.response);
});

xhr.open('GET','https://supersimplebackend.dev') //? this sets up the message (it will be a Get message here)
xhr.send() //? this sends the message (IT IS ASYNCHRONOUS)
// xhr.response //? U can also get the response and use it 
//! but wait!! the response is undefined!! because the response takes time to come back from the server
//! so we need to use a callback function 