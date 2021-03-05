"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_1 = require("./wallet");
function main() {
    let bobWallet = new wallet_1.Wallet();
    let hossamWallet = new wallet_1.Wallet();
    bobWallet.sendMoney(25, hossamWallet.publicKey);
    hossamWallet.sendMoney(20, bobWallet.publicKey);
}
main();
