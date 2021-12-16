

     export const istPasswValided=(passw)=>{
        if(/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(passw)){
            return true;
        }
        else{
            return false
        }
    }
