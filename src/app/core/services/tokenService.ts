import hashService from "core@/services/hashService";
let { encrypteData , decrypteData } = hashService;
interface tokenService {
  getToken: (key: string) => string;
  setToken: (key: string, value: string) => void;
  removeToken: (key: string) => void;
}


let tokenService: tokenService =  {
    getToken : (key: string): string   => {
        let token  =  localStorage.getItem(encrypteData(key));
        return decrypteData(token);
    },
    setToken : (key: string, value: string): void =>  {
        let hashedKey = encrypteData(key);
        let hashedValue = encrypteData(value);
        localStorage.setItem(hashedKey, hashedValue);
    },
    removeToken : (key: string): void =>  {
        localStorage.removeItem(encrypteData(key));
    }
}


export default tokenService;