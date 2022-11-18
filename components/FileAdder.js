import { useState } from 'react';

export class FileAdder {
    image;
    setImage;
    setCreateObjectURL;
    unused;
    constructor() {
        [this.image, this.setImage] = useState(null);

        [this.unused, this.setCreateObjectURL] = useState(null);
    }

    uploadToClient = (event) => {
        console.log(event)
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            this.setImage(i);
            this.setCreateObjectURL(URL.createObjectURL(i));
        }
    };
    uploadToServer = async (filename) => {
        const form = new FormData();
        form.append("newFilename",filename)
        form.append("file", this.image);
        await fetch("../../api/addFile", {
            method: "POST",
            body: form,
        });
    };
}

