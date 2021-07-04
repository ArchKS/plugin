import slide from "./slide.ts"
let params = {
    imgs: [
        "./assets/1.jpg",
        "./assets/2.jpg",
        "./assets/3.jpg",
        "./assets/4.jpg",
        "./assets/5.jpg",
    ],
    width: 512,
    height: 320,
    ifAutoPlay: true,
    autoPlayIntervalTime: 2000
}
let s = new slide(params);