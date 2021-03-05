import * as crypto from 'crypto';
import { Chain } from './chain';
import { Transaction } from './transactions';

export class Wallet{

    public publicKey:string; // for receiving money
    public privateKey:string; // for spending money

    constructor(){
        const keyPair= crypto.generateKeyPairSync('rsa',{
            modulusLength: 2048,
            publicKeyEncoding:{type:'spki',format:'pem'},
            privateKeyEncoding:{type:'pkc28',format:'pem'}
        });
        this.publicKey = keyPair.publicKey;
        this.privateKey = keyPair.privateKey;
    }

    sendMoney(amount:number,payeePublicKey:string){
        const transacion = new Transaction(amount,this.publicKey,payeePublicKey);
        const sign= crypto.createSign('SHA256');
        sign.update(transacion.toString()).end();

        const signature = sign.sign(this.privateKey); // configureda as auth to the private key without exposing it to the public
        Chain.instance.addBlock(transacion,this.publicKey,signature);
    }
}