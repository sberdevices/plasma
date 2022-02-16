interface Body extends HTMLElement {
    createTextRange: () => {
        moveToElementText: (node: Node) => void;
        select: () => void;
    };
}

export function selectText(node: Node) {
    setTimeout(() => {
        const body = document.body as Body;

        if (window.getSelection && document.createRange) {
            const range = document.createRange();
            range.selectNodeContents(node);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
        } else if (body.createTextRange) {
            const range = body.createTextRange();
            range.moveToElementText(node);
            range.select();
        }
    });
}
