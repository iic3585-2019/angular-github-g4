export class fetchUser {
  static readonly type = '[Github] Fetch User';
  constructor(public payload: string) {}
}

export class fetchRepo {
  static readonly type = '[Github] Fetch Repo';
  constructor(public payload: string) {}
}