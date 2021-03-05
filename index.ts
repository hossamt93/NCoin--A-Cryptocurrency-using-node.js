import { Wallet } from "./wallet";

function main(){
    let bobWallet = new Wallet();
    let hossamWallet = new Wallet();

    bobWallet.sendMoney(25,hossamWallet.publicKey);
    hossamWallet.sendMoney(20,bobWallet.publicKey);
}

main()