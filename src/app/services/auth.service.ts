import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  onAuthEvent(payload: any) {
    if (payload.event === 'signIn') {
      // console.log(payload.data.username);
      // console.log(payload.data.signInUserSession.idToken.jwtToken);
      this.getJwtToken().then((token) => {
        localStorage.setItem('auth-token', token);
      });
    }
  }

  // async getawsemail() {
  //   try {
  //     const user = await Auth.currentAuthenticatedUser();
  //     const { attributes } = user;
  //     const email = attributes.email;
  //     localStorage.setItem('user-email', email);
  //   } catch (error) {
  //     console.log('error getawsemail: ', error);
  //   }
  // }

  private async getJwtToken() {
    try {
      const session = await Auth.currentSession();
      return session.getIdToken().getJwtToken();
    } catch (err) {
      console.log('getJwtToken error: ', err);
      return err;
    }
  }

  public async signout() {
    try {
      localStorage.removeItem('auth-token');
      // localStorage.removeItem('user-email');
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}
