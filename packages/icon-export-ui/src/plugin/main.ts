import { getIconAsset, getIconComponent, getIconSource, getIndexSource } from '../source';
import type { FilesPayloadResponse, FilesPayloadRequest, UIMessage, IconPayload } from '../types';

const selectionNode = figma.currentPage.selection[0];

const defaultSetting = {
    title: 'Icon exporter plugin',
    height: 638,
    width: 372,
};

const main = async (selection: SceneNode, uiSetting: ShowUIOptions) => {
    figma.showUI(__html__, uiSetting);

    figma.on('run', () => {
        const { width, height } = selection;

        const supportSizes = [16, 24, 36, 48, 56, 64];

        if (width !== height || !supportSizes.includes(width)) {
            figma.closePlugin(`Please select icon with correct size: ${supportSizes}.`);
            return;
        }

        const payload: UIMessage<IconPayload> = {
            type: 'update-size',
            payload: { size: width },
        };
        figma.ui.postMessage(payload);
    });

    figma.ui.on('message', async (msg: UIMessage<FilesPayloadRequest>) => {
        if (msg.type === 'export-start') {
            const { iconName, iconSource, indexSource, category } = msg.payload;

            const payload: UIMessage<FilesPayloadResponse> = {
                type: 'export-done',
                payload: {
                    iconAsset: await getIconAsset(selection, iconName),
                    iconComponent: await getIconComponent(iconName),
                    indexSource: getIndexSource(indexSource, iconName),
                    iconSource: getIconSource(iconSource, category, iconName),
                },
            };
            figma.ui.postMessage(payload);
        }

        if (msg.type === 'create-pr-done') {
            figma.closePlugin();
        }

        if (msg.type === 'cancel') {
            figma.closePlugin();
        }
    });
};

main(selectionNode, defaultSetting);
