import { Exclude } from 'class-transformer';

export class Artist {
  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
  name: string;
  grammy: boolean;
  id: string;
}
