export class fetchUser {
  static readonly type = '[Github] Fetch User';
  constructor(public payload: string) {}
}