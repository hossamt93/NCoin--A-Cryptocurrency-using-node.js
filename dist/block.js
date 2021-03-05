"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
// a  block is a container for multible transactions , each block has a hash for the previous transacion
class Block {
    constructor(prevHash, transaction, timeStamp = Date.now()) {
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.timeStamp = timeStamp;
        this.nonce = Math.round(Math.random() * 9999999999);
    }
    get hash() {
        const str = JSON.stringify(this); // hashing current object
        const hash = crypto.createHash('SHA256'); // oneway encrypting algorithm
        hash.update(str).end();
        return hash.digest('hex');
    }
}
exports.Block = Block;
