import { saveAs } from "@progress/kendo-file-saver";

const downloadGraph = (type, cy, name) => {
    const options = {
        bg: "#fff"
    };
    let uri;
    let fileName = name;
    switch (type) {
        case "png":
            uri = cy.png(options);
            fileName += ".png";
            break;
        case "jpg":
            uri = cy.jpg(options);
            fileName += ".jpg";
            break;
        default:
            break;
    }

    saveAs(uri, fileName);
}

export {
    downloadGraph
}