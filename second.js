let private_value = "Secret Value";
let a = 100;
const printHello = () => {
    console.log("Hello From Module");
}

module.exports = {a, printHello, private_value};

const pcmvValue = () => {
    console.log("Hello..this is common value");
}

pcmvValue();
