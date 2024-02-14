interface tokenService {
  getToken: () => string;
  setToken: (value: string) => void;
  removeToken: () => void;
}

let tokenService: tokenService =  {
    getToken : (): string   => {
        let token  =  localStorage.getItem('token');
        return token;
    },
    setToken : (value: string): void =>  {
        localStorage.setItem('token', value);
    },
    
    removeToken : (): void =>  {
        localStorage.removeItem('token');
    }
}


export default tokenService;