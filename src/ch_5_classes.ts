///////////////////////////////////////////////
// Chess game classes

type TColor = "Black" | "White"
type TFile = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type TRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

class CPosition {
    constructor(
        private file: TFile,
        private rank: TRank,
    ) {}

    distanceFrom(position: CPosition){
        return {
            rank: Math.abs(this.rank - position.rank),
            file: Math.abs(this.file.charCodeAt(0) - position.file.charCodeAt(0))
        }
    }
}

abstract class CPiece {
    protected position: CPosition

    constructor(
        private readonly color: TColor,
        file: TFile,
        rank: TRank,
    ) {
        this.position = new CPosition(file, rank);
    }

    moveTo(position: CPosition){
        this.position = position
    }

    abstract canMoveTo(position: CPosition): boolean
}

class CKing extends CPiece {
    canMoveTo(position: CPosition): boolean {
        const distance = this.position.distanceFrom(position)
        return distance.rank < 2 && distance.file < 2;
    }
}

// class CBishop extends CPiece {}
// class CKnight extends CPiece {}
// class CRook extends CPiece {}
// class CPawn extends CPiece {}

class CGame {
    private pieces: CPiece[] = CGame.makePieces()

    private static makePieces(): CPiece[] {
        return [
            new CKing("White", "E", 1),
            new CKing("Black", "E", 8),
        ]
    }
}

///////////////////////////////////////////////
// super
class CQueen extends CPiece {
    public name: string

    constructor(
        name: string,
        color: TColor,
        file: TFile,
        rank: TRank,
    ) {
        super(color, file, rank);
        this.name = name
    }
    canMoveTo(position: CPosition): boolean {
        return true;
    }
    moveTo(position: CPosition){
        super.moveTo(position)
        console.log("CQueen.moveTo")
    }

}


///////////////////////////////////////////////
// Using this as a return type

class CSet {
    protected _aSetMembers: number[] = []

    has(value: number): boolean {
        return this._aSetMembers.includes(value)
    }

    add(value: number): this {
        if (!this.has(value)) {
            this._aSetMembers.push(value)
        }
        return this
    }
}


class CMutableSet extends CSet {
    delete(value: number): this {
        const index = this._aSetMembers.indexOf(value)

        if (index != -1){
            this._aSetMembers.splice(index, 1)
        }
        return this
    }
}


const aTmp = [0,1,2,3,4]

console.log("aTmp == %s", aTmp)
console.log("aTmp.includes(2) == %s", aTmp.includes(2))
console.log("aTmp.includes(10) == %s", aTmp.includes(10))
console.log("aTmp.indexOf(2) == %s", aTmp.indexOf(2))
console.log("aTmp.indexOf(10) == %s", aTmp.indexOf(10))
console.log("aTmp.splice(2, 1) == %s", aTmp.splice(2, 1))
console.log("aTmp == %s", aTmp)

