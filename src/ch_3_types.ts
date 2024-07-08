console.log("Hello")


const a = 1 + 2
console.log("typeof a == %s", typeof a)


let b = a + 3
let c = {
    apple: a,
    banana: b,
}
let d = c.apple * 4

let e: any = 5
let u: unknown = 7

if (typeof u === "number"){
    u += 8
}

let nl: 0 = 0
const bl: true = true

console.log("typeof nl == %s", typeof nl)

const sa1 = Symbol("a")
const sa2 = Symbol("a")

console.log("sa1 == sa1 is %s", sa1 === sa1)

//////////////////////////////////////////////////////
// Objects
let oA = {
    b: "X"
}

oA.b = "Y"
oA.b = "Z"
oA = { b: "C"}


let oP: {
    firstName: string
    lastName: string
    middleName?: string,
} = {
    firstName: "John",
    lastName: "John",
    // middleName: "John"
}

class CPerson {
    constructor(
        public firstName: string,
        public lastName: string,
        public middleName: string,

    ) {}
}

oP = new CPerson("a", "b", "c")

type Age = number

let age: Age = 5

console.log("age == %s", age)

type Ta = { f1: string, f2: number }
type Tb = { f1: string, f2: boolean, f3: number }

let aOrB: Ta | Tb = {
    f1: "f1",
    f2: true,
    f3: 5,

}

function f(a: string, b: number){
    return a || b
}


/////////////////////////////////////////////////
// Arrays


/////////////////////////////////////////////////
// undefined, null, void, never
function fa(x: number){
    if (x < 10){
        return x
    }
    else {
        return null
    }
}

function fd() {
    throw TypeError("Error")
}

function fe(){
    while (true){
        1+1
    }
}

let vUndefined = undefined
console.log("vUndefined == %s", vUndefined)
vUndefined = 1
console.log("vUndefined == %s", vUndefined)
vUndefined = "2"
console.log("vUndefined == %s", vUndefined)

let vNull = null
console.log("vNull == %s", vNull)
vNull = 1
console.log("vNull == %s", vNull)
vNull = "2"
console.log("vNull == %s", vNull)


///////////////////////////////////////////////////////////////////
// Enums
enum Language {
    English,
    Spanish,
    Hebrew,
}

let myLanguage = Language.English

console.log("myLanguage == %s", myLanguage)
myLanguage = Language.Hebrew
console.log("myLanguage == %s", myLanguage)

console.log("Language[0] == %s", Language[0])
console.log("Language[3] == %s", Language[3])

