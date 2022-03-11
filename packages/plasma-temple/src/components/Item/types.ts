import { Entity, MediaObject } from '../../types';

export interface ItemEntityType<Id = unknown> extends Entity<Id> {
    /** Ссылка на картинку */
    image: MediaObject;
}
