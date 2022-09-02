/*!! API / DOM only work in Browser when the internet is connected*/

fetch('https://jsonplaceholder.typicode.com/users')
.then(res => res.json())
.then(data => console.log(data))
.catch(error => console.log(error))


// async use korte hobe
try{
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json();
    console.log(data);
}
catch{

}
// document.getElementById('#')


/* synchrnous / asynchronous*/

/* set time out for Asynchronous js */
console.log(1);
setTimeout(() => {
    console.log(222,'Slowlyy asbee');
},2000);
console.log(3);
console.log(4);
console.log(5);
console.log(6);