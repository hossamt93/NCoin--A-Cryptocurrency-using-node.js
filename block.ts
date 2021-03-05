import * as crypto from 'crypto';
import { Transaction } from "./transactions";




// a  block is a container for multible transactions , each block has a hash for the previous transacion
export class Block{

    public nonce = Math.round(Math.random() *9999999999);
    constructor(
        public prevHash: string,
        public transaction:Transaction,
        public timeStamp = Date.now()
    ){}

    get hash(){
        const str = JSON.stringify(this); // hashing current object
        const hash = crypto.createHash('SHA256'); // oneway encrypting algorithm
        hash.update(str).end();
        return hash.digest('hex');
    }

}