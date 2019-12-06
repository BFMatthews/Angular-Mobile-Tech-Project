import { Injectable } from '@angular/core';
import { User } from '../../pages/auth/models/user.class';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private users: User[] = [];
  private usersJSON: any[] = [];
  public theUser = null;
  public userAccountUpdated: Subject<User> = new Subject();

  constructor() {
    var adminUser = {
      "forename":"Benjamin",
      "surname":"(Admin)",
      "nickname":"Benny",
      "dob":"1998-01-01",
      "sex":"m",
      "email":"ben@admin.com",
      "emailConfirm":"ben@admin.com",
      "password":"Password123?",
      "passwordConfirm":"Password123?",
      "avatarCategory":"t",
      "avatarID":"benmatthews12",
      "permission":"admin",
      "securityQuestion":"What is your mothers maiden name?",
      "securityAnswer":"Carter",
      "locked":false,
      "loans":[]
    }
    var librarianUser = {
      "forename":"Benjamin",
      "surname":"(Librarian)",
      "nickname":"Benny",
      "dob":"1998-01-01",
      "sex":"m",
      "email":"ben@librarian.com",
      "emailConfirm":"ben@librarian.com",
      "password":"Password123?",
      "passwordConfirm":"Password123?",
      "avatarCategory":"t",
      "avatarID":"benmatthews12",
      "permission":"librarian",
      "securityQuestion":"What is your mothers maiden name?",
      "securityAnswer":"Carter",
      "locked":false,
      "loans":[]
    }
    var normalUser = {
      "forename":"Benjamin",
      "surname":"(User)",
      "nickname":"Benny",
      "dob":"1998-01-01",
      "sex":"m",
      "email":"ben@user.com",
      "emailConfirm":"ben@user.com",
      "password":"Password123?",
      "passwordConfirm":"Password123?",
      "avatarCategory":"t",
      "avatarID":"benmatthews12",
      "permission":"user",
      "securityQuestion":"What is your mothers maiden name?",
      "securityAnswer":"Carter",
      "locked":false,
      "loans":[]
    }
    this.usersJSON.push(adminUser);
    this.usersJSON.push(librarianUser);
    this.usersJSON.push(normalUser);

    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    } 

    localStorage.setItem("users", JSON.stringify(this.usersJSON));

    if (!localStorage.getItem("theUser")) {
      localStorage.setItem("theUser", JSON.stringify(null));
    }

    const usersStorage = JSON.parse(localStorage.getItem("users")) as any[];
    const theUserStorage = JSON.parse(localStorage.getItem("theUser")) as any;

    // usersStorage.forEach(user => {
    //   this.usersJSON.push(Object.assign(new User(), user));
    // });

    this.theUser = theUserStorage ? Object.assign(new User(), theUserStorage) : null;    
  }

  public doLogin(user:User) {
    const theUser = this.users.filter(userToCheck => {
      return userToCheck.Email === user.Email && userToCheck.Password === user.Password;
    })[0];

    if (theUser !== undefined) {
      this.theUser = theUser;
      return true;
    } 
    return false;
  }

  public doLoginJSON(user) {
    const theUser = this.usersJSON.filter(userToCheck => {
      return userToCheck['email'] === user['email'] && userToCheck['password'] === user['password'];
    })[0];

    if (theUser !== undefined) {
      this.theUser = theUser;
      localStorage.setItem("theUser", JSON.stringify(this.theUser));
      return true;
    } 
    return false;
  }

  public doAccountExist(email):boolean {
    for (var i = 0; i < this.usersJSON.length;i++) {
      if (this.usersJSON[i].email == email) {
        return true;
      }
    }
    return false;
  }

  public doAccountAdminCheck(email):boolean {
    for (var i = 0; i < this.usersJSON.length;i++) {
      if (this.usersJSON[i].email == email) {
        if (this.usersJSON[i].permission == "admin") {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  public doCheckLocked(email):boolean {
    for (var i = 0; i < this.usersJSON.length; i++) {
      if (this.usersJSON[i].email == email) {
        if (this.usersJSON[i].locked == true) {
          return true;
        } 
        return false;
      }
    }
  }

  public doRegister(user:User): boolean {
    this.users.push(user);
    return true;
  }

  public doRegisterJSON(user):boolean {
    this.usersJSON.push(user);
    localStorage.setItem("users", JSON.stringify(this.usersJSON));
    return true;
  }

  public doGetUserObj(userEmail) {
    for (var i = 0; i < this.usersJSON.length; i++) {
      if (this.usersJSON[i].email == userEmail) {
        return this.usersJSON[i];
      }
    }
    return null;
  }

  public doGetUserEmail() {
    return this.theUser.email;
  }

  public doGetAllUserAccounts() {
    return this.usersJSON;
  }

  public doUpdateAccount(emailAddress, newData):boolean {
    for (var i = 0; i < this.usersJSON.length; i++) {
      if (this.usersJSON[i].email == emailAddress) {
        var newDataKeys = Object.keys(newData);
        var newDataValues = [];

        for(var item in newData) {
          newDataValues.push(newData[item]);
        }

        for (var j = 0; j < newDataKeys.length; j++) {
          var stringEq = newDataKeys[j];
          this.usersJSON[i][stringEq] = newDataValues[j];
        }
        localStorage.setItem("users", JSON.stringify(this.usersJSON));

        this.userAccountUpdated.next(this.usersJSON[i]);

        return true;
      }
    }
    return false;
  }

  get isAuthenticated():boolean {
    return this.theUser !== null;
  }

  doLogout() {
    this.theUser = null;
    localStorage.setItem("theUser", JSON.stringify(this.theUser));
    return true;
  }

  doAddBookRental(userEmail, rentalObj):boolean {
    for (var i = 0; i < this.usersJSON.length; i++) {
      if (this.usersJSON[i].email == userEmail) {
        this.usersJSON[i].loans.push(rentalObj);
        return true;
      }
    }
    return false;
  }

  doDeleteAccount(userEmail):boolean {
    for (var i = 0; i < this.usersJSON.length; i++) {
      if (this.usersJSON[i].email == userEmail) {
        this.usersJSON.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  doRemoveBookRental(userEmail, returnObj):boolean {
    for (var i = 0; i < this.usersJSON.length; i++) {
      if (this.usersJSON[i].email == userEmail) {
        for (var j = 0; j < this.usersJSON[i].loans.length; j++) {
          if (this.usersJSON[i].loans[j].isbn == returnObj.isbn) {
            this.usersJSON[i].loans.splice(j, 1);
            return true;
          }
        }
      }
    }
    return false;
  }

  doGetUserRentals(userEmail) {
    for (var i = 0; i < this.usersJSON.length; i++) {
      if (this.usersJSON[i].email == userEmail) {
        return this.usersJSON[i].loans;
      }
    }
    return null;
  }
}