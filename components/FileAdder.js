export class FileAdder {
    image;
    constructor() {
        this.image = [];
    }

    uploadToClient = (event) => {
        if (!!event.target.files) {
            for(let i = 0; i < event.target.files.length; i++) {
                this.image(image => [...image, event.target.files[i]]);
            }
        }
    };
    uploadToServer = (directory) => {
        this.image.forEach(elem => {
            let form = new FormData();
            form.append("newFilename",`${directory}/${elem.name}`)
            form.append("file", elem);
            fetch("../../api/addFile", {
                method: "POST",
                body: form,
            }).then(_ => {});
        })
    };
}

