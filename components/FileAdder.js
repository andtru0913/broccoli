import { useState } from 'react';

export class FileAdder {
    image;
    setImage;
    setCreateObjectURL;
    unused;
    constructor() {
        [this.image, this.setImage] = useState([]);

        [this.urls, this.setCreateObjectURL] = useState([]);
    }

    uploadToClient = (event) => {
        if (!!event.target.files) {
            for(let i = 0; i < event.target.files.length; i++) {
                this.setImage(image => [...image, event.target.files[i]]);
            }
        }
    };
    uploadToServer = (directory) => {
        console.log(directory)
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

