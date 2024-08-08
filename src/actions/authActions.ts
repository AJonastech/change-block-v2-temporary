'use server'
import { headers } from 'next/headers';
import { getServerSession } from '@/lib/getServerSession';



export async function refreshAccessToken() {
    console.log("OKAY TESTING TO SEE IF I GOT CALLED")
    try {
       
       
        // if (!refresh_token) {
        //     throw new Error('Refresh token not found');
        // }
      

        const response = await fetch(`http://localhost:3000/api/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
           
            },
        });

     

        if (!response.ok) {
     
            throw new Error('Failed to refresh access token');
        }

   
    } catch (err) {
      console.log("OKAY BE LIKE SAY I WORK SHA");
        console.error('Error refreshing access token:', err);
        throw err;
    }
}



  export async function signup(name: string, email: string, password: string) {
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }
  
      // Handle signup response
      return data;
    } catch (err) {
      console.error('Error signing up:', err);
      throw err;
    }
  }
  


