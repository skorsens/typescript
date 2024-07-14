//////////////////////////////////////////////////////////////////
// Different ways to define a function
import assert from "node:assert";

function f1(p1: number): number {
    return p1 + 1
}


let f2 = function (p1: number): number {
    return p1 + 1
}


let f3 = (p1: number): number => {
    return p1 + 1
}


let f4 = (p1: number): number =>
    p1 + 1


let f5 = Function("p1", 'return p1 + 1')


//////////////////////////////////////////////////////////////////
// Optional parameters
function f6(p1: number, p2?: string){
    console.log("f: p1==%s, p2==%s", p1, p2 || "undefined")
}


function f7(p1: number, p2: string = "undefined"){
    console.log("f: p1==%s, p2==%s", p1, p2)
}


//////////////////////////////////////////////////////////////////
// Rest parameters
function f8(p1: number,...numbers: number[]): number {
    return p1 + numbers.reduce((total, n) => total + n, 0)
}


//////////////////////////////////////////////////////////////////
// call, apply, bind
function add(n1: number, n2: number): number {
    return n1 + n2
}

console.log("add(20, 30)==%s", add(20, 30))
console.log("add.apply(null, [20, 30])==%s", add.apply(null, [20, 30]))
console.log("add.call(null, 20, 30)==%s", add.call(null,20, 30))
console.log("add.bind(null, 20, 30)()==%s", add.bind(null,20, 30)())

function fancyDate(this: Date) {
  return `${this.getDate()}/${this.getMonth()}/${this.getFullYear()}`
}

console.log("fancyDate() == %s", fancyDate.call(new Date))


//////////////////////////////////////////////////////////////////
// Generator functions
function* createFibonacciGenerator(){
    let a = 0
    let b = 1

    while (true){
        yield a;
        [a, b] = [b, a + b]
    }
}

const fibonacciGenerator = createFibonacciGenerator();

console.log("fibonacciGenerator() == %s", fibonacciGenerator.next())
console.log("fibonacciGenerator() == %s", fibonacciGenerator.next())
console.log("fibonacciGenerator() == %s", fibonacciGenerator.next())
console.log("fibonacciGenerator() == %s", fibonacciGenerator.next())


//////////////////////////////////////////////////////////////////
// Iterators
const numbers = {
    *[Symbol.iterator](){
        for (let n = 1; n <= 4; n++){
            yield n
        }
    }
}

for (const a of numbers){
    console.log("a == %s", a)
}

const allNumbers = [...numbers]
console.log("allNumbers == %s", allNumbers)

const [one, two, ...rest] = numbers
console.log("one == %s; two == %s, rest == %s", one, two, rest)


//////////////////////////////////////////////////////////////////
// Call signatures
type TSumFunc = (a: number, b: number) => number

const sumFunc: TSumFunc = (a, b) => { return a + b }
console.log("sumFunc(1, 2) == %s", sumFunc(1, 2))

function run_n_times(
    f: (n: number) => number,
    n: number,
){
    for (let i = 0; i < n; i++){
        console.log("f(%d)==%d", i, f(i))
    }
}

run_n_times(n => n + 5, 3)

// Shorthand function type
type TTransNumFunct = (n: number) => number

// Full function type is equivalent to the shorthand one
type TTrunsNumFunct_1 = {
    (n: number): number
}

function run_n_times_1(
    f: TTransNumFunct,
    n: number
){
    for (let i = 0; i  < n; i++){
        console.log("f(%d)==%d", i, f(i))
    }
}


const TransNumFunct: TTransNumFunct = (n) => { return n + 5 }
run_n_times_1(TransNumFunct, 3)
const TransNumFunct_1: TTrunsNumFunct_1 = (n) => { return n + 5 }
run_n_times_1(TransNumFunct_1, 3)

//////////////////////////////////////////////////////////////////
// Overloaded function types
type TOverloadedFunc_1 = {
    (n1: number, n2: number): number
    (n1: number): number
}

// The below does not compile despite what is written in the book
// C:\Projects\training\typescript>node_modules\.bin\tsc
// src/ch_4_functions.ts:154:7 - error TS2322: Type '(n1: number, n2: number) => number' is not assignable to type 'TOverloadedFunc_1'.
//   Target signature provides too few arguments. Expected 2 or more, but got 1.
const OverloadedFunc_1: TOverloadedFunc_1 = (
    n1,
    n2?: number
) => {
    if (n2 !== undefined){
        return n1 + n2 + 10
    }
    else {
        return n1 + 10
    }
}

console.log("OverloadedFunc_1(2)==%d", OverloadedFunc_1(2))
console.log("OverloadedFunc_1(2, 3)==%d", OverloadedFunc_1(2, 3))

function OverloadedFunc_2(n1: number): number;
function OverloadedFunc_2(s1: string, n2: number): number;

function OverloadedFunc_2(nORs: number| string, n2?: number): number {
    if (typeof nORs === "number"){
        return nORs + 20
    }
    else {
        if (n2 !== undefined) {
            if (nORs === '1') {
                return 1 - n2 - 20
            }
            else {
                return -n2 - 20
            }
        }
        else {
            return -1000
        }
    }
}

console.log("OverloadedFunc_2(1)==%d", OverloadedFunc_2(1))
console.log("OverloadedFunc_2(\"1\", 1)==%d", OverloadedFunc_2("1", 1))

// C:\Projects\training\typescript>node_modules\.bin\tsc
// src/ch_4_functions.ts:197:61 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
//
// 197 console.log("OverloadedFunc_2(\"1\")==%d", OverloadedFunc_2("1"))
//                                                                 ~~~
//
//   src/ch_4_functions.ts:176:10
//     176 function OverloadedFunc_2(nORs: number| string, n2?: number): number {
//                  ~~~~~~~~~~~~~~~~
//     The call would have succeeded against this implementation, but implementation signatures of overloads are not externally visible.
//
//
// Found 1 error in src/ch_4_functions.ts:197
// console.log("OverloadedFunc_2(\"1\")==%d", OverloadedFunc_2("1"))

function OverloadFunc_3(s: boolean): boolean;
function OverloadFunc_3(n: number): number;
function OverloadFunc_3(sORn: number | boolean): boolean | number {
    if (typeof sORn === "number"){
        return sORn
    }
    else {
        return sORn
    }
}

console.log("OverloadFunc_3(true)==%s", OverloadFunc_3(true))
console.log("OverloadFunc_3(2)==%s", OverloadFunc_3(2))


type TOverloadFunc_3_1 = {
    (s: boolean): number;
    (n: number): number;
}

const OverloadFunc_3_1: TOverloadFunc_3_1 = (
    sORn: boolean | number
): number => {
    if (typeof sORn === "number"){
        return sORn
    }
    else {
        return -1
    }
}


//////////////////////////////////////////////////////////////////
// Function properties

function funcWithProperty(){
    if (funcWithProperty.bWasCalled){
        return 1
    }
    funcWithProperty.bWasCalled = true
    return 0
}
funcWithProperty.bWasCalled = false

console.log("funcWithProperty()==%d", funcWithProperty())
console.log("funcWithProperty()==%d", funcWithProperty())

type TFuncWithProperty_1 = {
    (): number
    bWasCalled: boolean
}

const funcWithProperty_1: TFuncWithProperty_1 = () => {
    if (funcWithProperty_1.bWasCalled){
        return 1
    }
    funcWithProperty_1.bWasCalled = true
    return 0
}

console.log("funcWithProperty_1()==%d", funcWithProperty_1())
console.log("funcWithProperty_1()==%d", funcWithProperty_1())
funcWithProperty_1.bWasCalled = false


//////////////////////////////////////////////////////////////////
// Polymorphism
type TFilterFunc = {
    <T>(array: T[], f: (n: T) => boolean): T[]
}

const filterFunc: TFilterFunc = (array, f) => {
    const result = []

    for (let i = 0; i<array.length; i++){
        if (f(array[i])){
            result.push(array[i])
        }
    }
    return result
}

console.log("filterFunc([1,2,3,4], _ => _ < 3)==%s", filterFunc([1,2,3,4], _ => _ < 3))
console.log('filterFunc(["1","2","3","4"], _ => _ < "3")==%s', filterFunc(["1","2","3","4"], _ => _ < "3"))

function filterFunc_1<T>(a: T[], f: (e: T) => boolean): T[]{
    const result: T[] = []

    for (let i = 0; i<a.length; i++){
        if (f(a[i])){
            result.push(a[i])
        }
    }

    return result
}
console.log("filterFunc_1([1,2,3,4], _ => _ < 3)==%s", filterFunc_1([1,2,3,4], _ => _ < 3))
console.log('filterFunc_1(["1","2","3","4"], _ => _ < "3")==%s', filterFunc_1(["1","2","3","4"], _ => _ < "3"))


function map_unknown(a: unknown[], f: (e: unknown) => unknown): unknown[]{
    const result: unknown[] = []

    for (const e of a){
        result.push(f(e))
    }

    return result
}

function map_generics<T>(a: T[], f: (e: T) => T): T[]{
    const result: T[] = []

    for (const e of a){
        result.push(f(e))
    }

    return result
}

console.log("map_generics([1,2,3,4], _ => _ + 3)==%s", map_generics([1,2,3,4], _ => _ + 3))
console.log('map_generics(["1","2","3","4"], _ => _ + "-3")==%s', map_generics(["1","2","3","4"], _ => _ + "-3"))

//////////////////////////////////////////////////////////////////
// Bounded Polymorphism

type TreeNode = {
    value: string
}

type LeafNode = TreeNode & {
    isLeaf: true
}

type InnerNode = TreeNode & {
    children: [TreeNode] | [TreeNode, TreeNode]
}

function mapNode<T extends TreeNode>(node: T, f: (value: string) => string): T {
    return {
        ...node,
        value: f(node.value)
    }
}
