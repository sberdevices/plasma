const TYPE = {
    CDATA: "cdata",
    DOCUMENT: "document",
    ELEMENT: "element",
    TEXT: "text",
};

const nodeType = (node) => {
    if (node.nodeType === 1) {
        return TYPE.ELEMENT;
    }

    if (node.nodeType === 3 || node.nodeType === 4) {
        return TYPE.TEXT;
    }

    if (node.nodeType === 9) {
        return TYPE.DOCUMENT;
    }

    throw new Error("Unsupported element type");
};

const xmlToJson = (node) => {
    const type = nodeType(node);

    const obj = {
        type,
    };

    if (type === TYPE.ELEMENT) {
        obj.name = node.nodeName.toLowerCase();

        if (node.attributes.length > 0) {
            obj.attributes = {};
            for (const attribute of Array.from(node.attributes)) {
                obj.attributes[attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (type === TYPE.TEXT) {
        obj.text = node.nodeValue.replace("<![CDATA[", "").replace("]]>", "").trim();
    }

    // do children
    if (node.hasChildNodes()) {
        const childNodes = Array.from(node.childNodes).filter((childNode) => [1, 3, 4].includes(childNode.nodeType));
        const elements = [];

        obj.elements = elements;

        for (const childNode of childNodes) {
            const childObj = xmlToJson(childNode);

            if (childObj.type !== TYPE.TEXT || childObj.text.length > 0) {
                elements.push(childObj);
            }
        }
    }

    return obj;
};

export default xmlToJson;
