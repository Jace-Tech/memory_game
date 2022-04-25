export const imageData = [{
        id: "image-1",
        name: "react",
        src: "./img/react.png"
    },
    {
        id: "image-5",
        name: "js",
        src: "./img/js.png"
    },
    {
        id: "image-7",
        name: "npm",
        src: "./img/npm.png"
    },
    {
        id: "image-8",
        name: "google",
        src: "./img/google.png"
    },
    {
        id: "image-9",
        name: "facebook",
        src: "./img/facebook.png"
    },
    {
        id: "image-10",
        name: "pycharm",
        src: "./img/pycharm.png"
    },
    {
        id: "image-11",
        name: "vue",
        src: "./img/vue.png"
    },
    {
        id: "image-12",
        name: "angular",
        src: "./img/angular.png"
    },
    {
        id: "image-13",
        name: "anaconda",
        src: "./img/anaconda.png"
    },
    {
        id: "image-15",
        name: "basketball",
        src: "./img/basketball.png"
    },
    {
        id: "image-16",
        name: "python",
        src: "./img/python.png"
    },
    {
        id: "image-17",
        name: "vscode",
        src: "./img/vscode.png"
    },
]

export const shuffle = (array) => {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}