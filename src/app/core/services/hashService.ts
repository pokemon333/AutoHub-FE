import CryptoJS from 'crypto-js';
const keyValue = 'auto-hub'; 

export default { 
        encrypteData : (data   : string ) =>  {
            return CryptoJS.AES.encrypt(data, keyValue).toString();
        },
        decrypteData : (hashedValue : string | null ) =>  {
            return  CryptoJS.AES.decrypt(hashedValue, keyValue);
        }
}
