export class Transaction{
    constructor(
        public amount: number,
        public payer: string,
        public payee: string // public key represents the person
    ){}

    toString(){
        return JSON.stringify(this); //serialize cryptographic object
    }
}