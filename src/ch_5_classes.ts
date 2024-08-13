///////////////////////////////////////////////
// Chess game classes

import {type} from "node:os";

type TColor = 'Black' | 'White'
type TFile = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type TRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8


class CPosition {
    constructor (
        private file: TFile,
        private rank: TRank,
    ){}

    distanceFrom(position: CPosition){
        return {
            rank: Math.abs(position.rank - this.rank),
            file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0)),
        }
    }
}


abstract class CPiece {
    protected position: CPosition

    constructor(
        private readonly color: TColor,
        file: TFile,
        rank: TRank
    ) {
        console.log("CPiece.constructor", color, file, rank)
        this.position = new CPosition(file, rank)
    }

    moveTo(position: CPosition): void {
        console.log("CPiece.moveTo", position)

        if (this.canMoveTo(position)){
            this.position = position
        }
    }

    take(position: CPosition): void {
        console.log("CPiece.take", position)

        if (this.canMoveTo(position)){
            this.position = position
        }
    }
    abstract canMoveTo(position: CPosition): boolean
}


class CKing extends CPiece {

    constructor(
        color: TColor,
        file: TFile,
        rank: TRank
    ) {
        console.log("CKing.constructor", color, file, rank)
        super(color, file, rank)
    }

    canMoveTo(position: CPosition): boolean {
        const distance = this.position.distanceFrom(position)
        const bRc = distance.rank < 2 && distance.file < 2
        console.log("CKing.canMoveTo", position, distance, bRc)
        return bRc
    }

    take(position: CPosition): void {
        console.log("CKing.take", position)

        super.take(position)
    }
}


class CQueen extends CPiece {
    canMoveTo(position: CPosition): boolean {
        const distance = this.position.distanceFrom(position)
        const bRc = distance.rank < 9 && distance.file < 9
        console.log("CQueen.canMoveTo", position, distance, bRc)
        return bRc
    }
    take(position: CPosition): void {
        console.log("CQueen.take", position)

        super.take(position)
    }

}
// class CBishop extends CPiece {}
// class CKnight extends CPiece {}
// class CPook extends CPiece {}
// class CPawn extends CPiece {}


class CGame {
    private pieces = CGame.makePieces()

    private static makePieces(){
        return [
            new CKing('White', 'E', 1),
            new CKing('Black', 'E', 8),

            new CQueen('White', 'D', 1),
            new CQueen('Black', 'D', 8),
        ]
    }

    start(){
        console.log('start')
    }
    getPiece(pieceIndex: number): CPiece {
        return this.pieces[pieceIndex]
    }
}

const game = new CGame()
game.start()
game.getPiece(0).moveTo(new CPosition('E',2))
game.getPiece(2).moveTo(new CPosition('D',2))

game.getPiece(0).take(new CPosition('E',2))
game.getPiece(2).take(new CPosition('D',2))


///////////////////////////////////////////////
// Using this as a return type
console.log('------------------------------ Using this as a return type --------------------------')

class CSet {
    protected members: Map<number, boolean> = new Map()
    has(value: number): boolean {
        return this.members.has(value)
    }

    add(value: number): this {
        if (! this.members.has(value)){
            this.members.set(value, true)
        }
        return this
    }

    print_by_for(){
        console.log('print_by_for Set values:')
        for (const k of this.members.keys()){
            console.log('Member: ', k )
        }
    }

    print_by_forEach(){
        console.log('print_by_forEach Set values:')

        this.members.forEach((value: boolean, key: number) => {
            console.log('Member: ', key, value )
        });
    }
}


class CSetWithDelete extends CSet {
    delete(value: number): this{
        if (this.has(value)){
            this.members.delete(value)
        }
        return this
    }
}


const SetWithDelete = new CSetWithDelete()

SetWithDelete.print_by_for()
SetWithDelete.add(1).add(2).add(3)
SetWithDelete.print_by_for()
SetWithDelete.delete(2)
SetWithDelete.print_by_for()
SetWithDelete.print_by_forEach()


///////////////////////////////////////////////
// Interfaces
type TFood = {
    calories: number
    tasty: boolean
}

type TSushi = TFood & {
    salty: boolean
}

type TCake = TFood & {
    sweet: boolean
}

interface IFood {
    calories: number
    tasty: boolean
}

interface ISushi extends IFood {
    salty: boolean
}

interface ICake extends IFood {
    sweet: boolean
}

interface IA {
    good(x: number): string
    bad(x: number): string
}

interface IA {
    one_more(y: boolean): string
}

interface IB extends IA {
    good(x: number | string): string
    bad(x: number): string
}

type TA = {
    good(x: number): string
    bad(x: number): string
}

type TB = TA & {
    good(x: number | string): string
    bad(x: number | string): string
}
class CB implements IB {
    good(x: number): string {
        return ''
    }
    bad(x: number | string): string {
        return ''
    }
    one_more(y: boolean): string {
        return ''
    }
}

///////////////////////////////////////////////
// Types and values are 2 different namespaces, but classes are both types and values
type aa = number
const aa: aa = 5

class C {}
const cc: C = new C()

console.log("typeof C == ", typeof C)
console.log("typeof cc == ", typeof cc)

///////////////////////////////////////////////
// Polymorphism
type TMapState<K extends string | number | symbol, V> = {
    [k in K]: V;
};

// class CMyMap<K extends string | number | symbol, V> {
//     private map: TMapState<K, V>
//
//     constructor(k: K, v:V) {
//         this.map[k] = v
//     }
//
//     get(k: K): V {
//         return this.map[k]
//     }
// }


///////////////////////////////////////////////
// Mixins

class CUser {
    constructor(
        private id: number,
        private name: string,
    ) {
    }

    getDebugValue(){
        return {
            id: this.id,
            name: this.name,
        }
    }
}


type TClassConstructor<T> = new(...args: any[]) => T

function withEzDebug<C extends TClassConstructor<{
    getDebugValue(): object
}>>(Class: C){
    return class extends Class {
         debug(){
             const Name = Class.constructor.name
             const value = this.getDebugValue()
             return Name + '(' + JSON.stringify(value) + ')'
         }
    }
}

const CEzDebugUser = withEzDebug(CUser)
const user = new CEzDebugUser(1, 'User 1')

console.log('user.debug() == ', user.debug())

///////////////////////////////////////////////
// Simulating final classes

class CFinalClass {
    private constructor(private arg: string) {
    }

    static create(arg: string){
        return new CFinalClass(arg)
    }
}

// class CExtendsFinalClass extends CFinalClass {} Error TS2675: Cannot extend a class
const finalClassInstance = CFinalClass.create('arg')

///////////////////////////////////////////////
// Factory pattern
type Shoe = {
    purpose: string
}

class CBalletShoe implements Shoe {
    purpose = 'ballet'
}

class CBootShoe implements Shoe {
    purpose = 'working'
}

let Shoe = {
    create(shoeType: 'ballet' | 'boot'): Shoe{
        switch (shoeType){
            case 'ballet': return new CBalletShoe
            case 'boot': return new CBootShoe()
        }
    }
}

const shoe = Shoe.create('boot')
console.log('shoe.purpose == ', shoe.purpose)

///////////////////////////////////////////////
// Builder pattern
class CRequestBuilder {
    private url: string | null = null
    private method: 'get' | 'post' | null = null

    setUrl(url: string): this{
        this.url = url
        return this
    }
    setMethod(method: 'get' | 'post'): this{
        this.method = method
        return this
    }

    print(){
        console.log('url == ', this.url, '; method == ', this.method)
    }
}

new CRequestBuilder()
    .setMethod('get')
    .setUrl('http://www.url.com')
    .print()

