import { createApp, Screen, GalleryItemViewPayload, OnStart, OnData } from "@sberdevices/plasma-temple";

const onStart: OnStart = ({ pushState }) => {
    const items: GalleryItemViewPayload[] = Array.from({ length: 5 }, (_, index) => ({
        id: `${index}`,
        label: `Card ${index + 1}`,
        position: 1 + index,
        image: {
            src: "https://via.placeholder.com/392.png",
            ratio: "1:1",
        },
    }));

    pushState({
        type: Screen.gallery,
        data: {
            title: "Basic Gallery",
            items,
        },
        step: 0,
        position: 0,
    });
};

const onDataGetter = (isPush: boolean): OnData => (action, { pushState, setState }) => {
    const items: GalleryItemViewPayload[] = Array.from({ length: 5 }, (_, index) => ({
        id: `${index}`,
        label: `Card ${index + 1}`,
        position: 1 + index,
        image: {
            src: "https://via.placeholder.com/392.png",
            ratio: "1:1",
        },
    }));

    const data = {
        title: `Card ${action.payload.id}`,
        background: {
            src: `https://via.placeholder.com/1920x1080.png/?text=Card ${action.payload.id}`,
        },
        entities: items.filter(({ id }) => id !== action.payload.id),
        entitiesTitle: "Другие карточки",
        itemShowButtonText: "Button text",
        id: action.payload.id as string,
        description: [
            {
                title: "Description",
                content: `Card ${action.payload.id}`,
            },
        ],
    };

    switch (action.type) {
        case "ITEM/SHOW":
            if (isPush) {
                pushState({
                    type: Screen.entity,
                    data,
                    step: 0,
                    position: 0,
                });
            } else {
                setState({
                    data,
                    step: 0,
                    position: 0,
                });
            }
    }
};

export const App = createApp({
    routes: [
        { type: Screen.gallery, assistant: { onData: onDataGetter(true) } },
        { type: Screen.entity, assistant: { onData: onDataGetter(false) } },
    ],
    header: {
        title: "Plasma Basic App template",
        subtitle: "Based on React | StyledComponents | PlasmaUI | AssistantClient",
        logo: "/images/logo.png",
    },
    assistant: {
        initPhrase: "Привет!",
        nativePanel: {
            defaultText: "Позови Джой",
        },
        onStart,
    },
});
