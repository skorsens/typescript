const ca = 'x'
let va = ca

va = 'y'

let null_a = null
let undef_a = undefined

let ch6d = 1 as const

type TOptions = {
    f1: string
    f2: number
}

const o1: TOptions = {
    f1: 'x',
    f2: 2
}

type UserTextEvent = {type: 'TextEvent', value: string, target: string}
type UserMouseEvent = {type: 'MouseEvent', value: number, target: number}
type UserEvent = UserTextEvent | UserMouseEvent

function handleUserEvent_1(event: UserEvent) {
  if (event.type === 'TextEvent') {
    console.log("typeof event === ", typeof event)
    return
  }
  console.log("typeof event === ", typeof event)
}

function handleUserEvent_2(event: UserEvent) {
    console.log("typeof event === ", typeof event)
}
handleUserEvent_2({type: 'TextEvent', value: "val", target: "tgt"} as UserTextEvent)
const userTextEvent: UserTextEvent = {type: 'TextEvent', value: "val", target: "tgt"}
const userMouseEvent: UserMouseEvent = {type: 'MouseEvent', value: 2, target: 3}
handleUserEvent_2(userTextEvent)

handleUserEvent_1(userTextEvent)
handleUserEvent_1(userMouseEvent)

/////////////////////////////////////////////////////////
// keyin and keyof

type APIResponse = {
  user: {
    userId: string
    friendList: {
      count: number
      friends: {
        firstName: string
        lastName: string
      }[]
    }
  }
}

type FriendList = APIResponse['user']['friendList']
type FriendListFriend =FriendList['friends'][number]
type TFriendListFriendKeys = keyof FriendListFriend
const FriendListFriendKeys: TFriendListFriendKeys = 'firstName'

function get<
    O extends object,
    K extends keyof O,
>
(o: O, k: K): O[K]
{
    return o[k]
}

const apiResponse: APIResponse = {
    user: {
        userId: "string",
        friendList: {
            count: 2,
            friends: [
                {
                    firstName: "fn1",
                    lastName: "ln1",
                },
                {
                    firstName: "fn2",
                    lastName: "ln2",
                },
            ]
        }
    }
  }


const user:string = get(apiResponse.user, "userId")

/////////////////////////////////////////////////////////
// Record type
type WeekDay = "Mon" | "Tue" |"Wed" |"Thu" |"Fri"

type Day = WeekDay | "Sat" | "Sun"

const nextDay: Record<WeekDay, Day> = {
    Mon: "Tue",
    Tue: "Wed",
    Wed: "Thu",
    Thu: "Fri",
    Fri: "Sat",
}

console.log("nextDay.Mon == ", nextDay.Mon)

/////////////////////////////////////////////////////////
// Mapped types
type NextDayM = { [K in WeekDay]: Day };

const nextDayM: NextDayM = {
    Mon: "Tue",
    Tue: "Wed",
    Wed: "Thu",
    Thu: "Fri",
    Fri: "Sat",
}
console.log("nextDayM.Mon == ", nextDayM.Mon)


type Account = {
    id: number,
    notes: string[],
}

type AccountWithOptionalFields = {
    [K in keyof Account]?: Account[K]
}
type AccountWithOptionalFields1 = Partial<Account>

type AccountWithNullFields = {
    [K in keyof Account]: Account[K] | null
}

type AccountWithRoFields = {
    readonly [K in keyof Account]: Account[K]
}
type AccountWithRoFields1 = Readonly<Account>

type AccountWithAllWritableFields = {
    -readonly [K in keyof AccountWithRoFields]: AccountWithRoFields[K]
}

type AccountWithAllRequiredFields = {
    [K in keyof AccountWithOptionalFields]-?: AccountWithOptionalFields[K]
}
type AccountWithAllRequiredFields1 = Required<AccountWithOptionalFields>

type AccountWithoutNotes = Pick<Account, "id">

const accountWithoutNote: AccountWithoutNotes = {
    id: 5
}

/////////////////////////////////////////////////////////
// Companion Object pattern
type Unit = "USD" | "GBP" | "NIS" | "EUR";

type Currency = {
    unit: Unit
    value: number
}

let Currency = {
    fromValue(value: number, unit: Unit = "USD"): Currency {
        return { unit, value }
    }
}

const amount11: Currency = {
    unit: "GBP",
    value: 10,
}

const amount12: Currency = {
    unit: "GBP",
    value: 10,
}

const amount2: Currency = Currency.fromValue(10, "GBP")

console.log("(amount11 == amount12) == ", amount11 == amount12)
console.log("(amount11 == amount2) == ", amount11 == amount2)

/////////////////////////////////////////////////////////
// Improving type inference for tuples
const ach61 = [1, true] // (number | boolean)[]
const ach62 = [1, true] as const // [1, true]
const ach63:[1, true] = [1, true]       // [1, true]

function tuple <T extends unknown[]>(...ts: T): T {
    return ts
}

const tch6 = tuple(1, true) // [number, boolean]


/////////////////////////////////////////////////////////
// User-defined type guards
function isString(v: unknown): v is string { // Type guard
    return typeof v === "string"
}
console.log("isString('s') == ", isString('s'))
console.log("isString(4) == ", isString(4))

function parseInput(input: string | number):string {
    let upperCaseInput: string = ""

    if (isString(input)){
        upperCaseInput = input.toUpperCase()
    }

    return upperCaseInput
}

class t1ch6 {
    constructor(public f1: number, public f2: string){}
}

class t2ch6 {
    constructor(
        public f1: boolean,
        public f2: number,
        public f3: string,
    ){}
}

function ist1ch6(v: t1ch6 | t2ch6): v is t1ch6 {
    return v instanceof t1ch6
}

/////////////////////////////////////////////////////////
// Conditional types
type IsString<T> = T extends string ? true : false

type A = IsString<string>
type B = IsString<number>

// Distributive conditionals
type Without<T, U> = T extends U ? never : T

type t3ch6 = Without<(boolean | string | number), boolean>

// const v30ch6: t3ch6 = true // error TS2322: Type 'boolean' is not assignable to type 't3ch6'
const v31ch6: t3ch6 = "true"
const v321ch6: t3ch6 = 5

// Infer
type ElemType<T> = T extends unknown[] ? T[number] : T
type ElemString = ElemType<string[]> // string
const ch6i11: ElemString = "test"
// const ch6i12: ElemString = 5 // error TS2322: Type 'number' is not assignable to type 'string'

type ElemType2<T> = T extends (infer U)[] ? U : T
type ElemString2 = ElemType2<string[]> // string
const ch6i21: ElemString = "test"
// const ch622: ElemString = 5 // error TS2322: Type 'number' is not assignable to type 'string'

type ElemString3 = string[][number]
const ch6i31: ElemString3 = "test"
// const ch6i32: ElemString3 = 5 // error TS2322: Type 'number' is not assignable to type 'string'


/////////////////////////////////////////////////////////
// Type assertions
function handleInput(input: string): void {
    console.log("input==", input)
}

function getInput(): string | number {
    return "str"
}

const input = getInput()

// handleInput(input) // error TS2345: Argument of type 'string | number' is not assignable to parameter of type 'string'
handleInput(input as string)
handleInput(<string>input)

const bch6: boolean = false
const nch6: number | boolean = bch6
