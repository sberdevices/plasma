interface CustomDocument extends Document {
    selection?: {
        empty: () => void;
    };
}
export function clearSelection() {
    const doc = document as CustomDocument;

    if (window.getSelection) {
        window.getSelection()?.removeAllRanges();
    } else if (doc.selection) {
        doc.selection.empty();
    }
}
