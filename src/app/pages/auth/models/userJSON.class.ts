export class UserJSON {

  private email: string = '';
  private password?: string = '';
  private firstName?: string = '';
  private lastName?: string = '';
  private nickName?: string = '';
  private passwordConfirm?: string = '';
  private dob?:Date = null;
  private sex?: string = '';

  public clear() {
    this.Email = '';
    this.clearPassword();
    this.FirstName = '';
    this.LastName = '';
  }

  public clearPassword() {
    this.Password = '';
    this.PasswordConfirm = '';
  }

  get Name() {
    return `${this.firstName} ${this.lastName}`;
  }

  get Password() {
    return this.password;
  }

  get PasswordComfirm() {
    return this.passwordConfirm;
  }

  set FirstName(value: string) {
    this.firstName = value;
  }

  set LastName(value: string) {
    this.lastName = value;
  }

  set Email(value: string) {
    this.email = value;
  }

  set Password(value: string) {
    this.password = value;
  }

  set PasswordConfirm(value: string) {
    this.passwordConfirm = value;
  }
}