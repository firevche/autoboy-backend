import { Role } from "@prisma/client";
import { compare, hash } from "bcryptjs";

export class User {
  private _password: string;
  private _role: Role;

  constructor(private readonly _email: string, role?: Role, passwordHash?: string) {
    this._role = role || Role.ADMIN;
    if (passwordHash) {
      this._password = passwordHash;
    }
  }
  get email(): string {
    return this._email;
  }
  get password(): string {
    return this._password;
  }
  get role(): Role {
    return this._role;
  }
  public async setPassword(pass: string, salt: number): Promise<void> {
    this._password = await hash(pass, salt);
  }
  public async comparePassword(pass: string): Promise<boolean> {
    return compare(pass, this._password);
  }
}
