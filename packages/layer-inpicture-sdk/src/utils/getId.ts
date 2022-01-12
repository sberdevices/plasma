import Cookies from 'js-cookie';
import { nanoid } from 'nanoid';

const idName = 'layerUserId';

export const getID = () => {
    let id = Cookies.get(idName);

    if (!id) {
        id = nanoid();
        Cookies.set(idName, id, { expires: 9999 });
    }

    return id;
};
