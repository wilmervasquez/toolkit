import type { User } from '$prisma';

export class UserState {
  name = $state('')
  constructor(user: User) {
    this.name = user.name!
  }
}
