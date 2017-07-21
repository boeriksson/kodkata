import postToParent from './postToParent';

let size = 0;

export default function () {
    const newSize = document.getElementById('app').offsetHeight + 50;

    if (newSize && newSize !== size) {
        postToParent({
            type: 'heightChange',
            height: newSize
        });
        size = newSize;
    }
}
