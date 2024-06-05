'use client'


import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios"



export default function SignUp (){

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

function register(){
axios.post("http://localhost:4000/api/auth/register",{
    username:username,
    password:password,
    role:role,
    email:email
}).then(function(response){
    console.log(response.data);
    
    
    
}).catch(function(err){
    console.log(err);
    
})
}


    return(
        <div>
      
        <div >
          <div >
            <div >
              
               
            </div>
            <form   autoComplete="off">
              <h4>
                We are <span>HERE</span>
              </h4>
              <p>Welcome! Sign up to view today's products:</p>
              <div>
                <input
                  placeholder="username"
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="username">username:</label>
              </div>
              <div>
                <input
                  placeholder="email"
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">email:</label>
              </div>
              <div >
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
              </div>
              <div >
                <input
                  placeholder="Role"
                  type="text"
                  name="role"
                  id="role"
                  autoComplete="off"
                  onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="role">Role:</label>
              </div>
              <button onClick={(e: React.FormEvent) => {
                   register()
                        e.preventDefault()
                        router.push("/");}
              }>Sign up</button>
              
            </form>
            {message && <p>{message}</p>}
           
          </div>
        </div>
      </div>
    )
}
