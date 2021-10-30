import { FC } from 'react';

export type Item = { name: string; component: FC<any> };
export type Group = { name: string; items: Array<Item> };
export type Data = Array<Group>;
