"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("./block");
const transactions_1 = require("./transactions");
const crypto = __importStar(require("crypto"));
class Chain {
    constructor() {
        this.chain = [new block_1.Block('', new transactions_1.Transaction(100, 'hossam', 'taha'))];
    }
    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(transaction, senderPublicKey, signature) {
        const verifier = crypto.createVerify('SHA256');
        verifier.update(transaction.toString()).end();
        const isValid = verifier.verify(senderPublicKey, signature);
        if (isValid) {
            const newBlock = new block_1.Block(this.lastBlock.hash, transaction);
            this.mine(newBlock.nonce);
            this.chain.push(newBlock);
        }
    }
    mine(nonce) {
        let solution = 1;
        console.log('mining....');
        while (true) {
            const hash = crypto.createHash('MD5'); //brute force mining
            hash.update((nonce + solution).toString()).end();
            const attempt = hash.digest('hex');
            if (attempt.substr(0, 4) == '0000') {
                console.log(`sloved ... ${solution}`);
                return solution;
            }
            solution += 1;
        }
    }
}
exports.Chain = Chain;
Chain.instance = new Chain(); // singlton design  -there should be one instance only shared 
