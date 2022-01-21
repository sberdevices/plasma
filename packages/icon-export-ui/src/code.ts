import { FormPayload } from './app/components/form/Form';

interface MessageData {
    type: string;
    payload: FormPayload;
}

figma.showUI(__html__, {
    title: 'Icon exporter plugin',
    height: 548,
    width: 372,
});

figma.ui.onmessage = async (msg: MessageData) => {
    if (msg.type === 'export-icon') {
        const svgSource = await figma.currentPage.selection[0].exportAsync({
            format: 'SVG',
        });

        const svgResult = String.fromCharCode.apply(null, Array.from(svgSource));

        // eslint-disable-next-line no-console
        console.log(svgResult);
    }

    figma.closePlugin();
};
