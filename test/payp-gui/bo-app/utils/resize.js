import postToParent from './postToParent';

let size = 0;

export default function () {
    const newSize = document.getElementById("app").offsetHeight;

    if (newSize && newSize !== size) {
        postToParent({
            type: "heightChange",
            height: newSize
        });
        size = newSize;
    }
};
