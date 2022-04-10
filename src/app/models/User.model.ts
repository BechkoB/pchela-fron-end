export class User {
  token: string;
  userid: string;
  email: string;
  userRole: string;
  isActive: string;
  tokenExpiresIn: number;

  constructor(user: User) {
    for (const userKey in user) {
      if (!user.hasOwnProperty(userKey)) {
        continue;
      }

      this[userKey] = user[userKey];
    }
  }
}
