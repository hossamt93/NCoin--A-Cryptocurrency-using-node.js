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
const chain_1 = require("./chain");
const transactions_1 = require("./transactions");
class Wallet {
    constructor() {
        const keyPair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkc28', format: 'pem' }
        });
        this.publicKey = keyPair.publicKey;
        this.privateKey = keyPair.privateKey;
    }
    sendMoney(amount, payeePublicKey) {
        const transacion = new transactions_1.Transaction(amount, this.publicKey, payeePublicKey);
        const sign = crypto.createSign('SHA256');
        sign.update(transacion.toString()).end();
        const signature = sign.sign(this.privateKey); // configureda as auth to the private key without exposing it to the public
        chain_1.Chain.instance.addBlock(transacion, this.publicKey, signature);
    }
}
exports.Wallet = Wallet;
