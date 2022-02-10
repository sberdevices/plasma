import { Description, Entity, Currency } from '../../types';

export interface ProductVariation<Id = unknown> extends Entity<Id> {
    variations: string[];
    activeIndex: number;
}

interface NameValue {
    name: string;
    value?: string;
}

export interface ProductEntity<Id = unknown> extends Entity<Id> {
    nameDetails?: string;
    shortDescription?: string;
    description?: Description;
    price?: number;
    oldPrice?: number;
    currency?: Currency;
    images?: string[];
    shortDetails?: NameValue[];
    details?: { title: string; values: NameValue[] };
}
