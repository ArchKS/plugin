import "./style.scss"
let instances = [];
type params = {
    imgs: string[],
    width?: number,
    height?: number,
    ifAutoPlay?: boolean,
    autoPlayIntervalTime?: number
}

class Slides {
    imgs: string[];
    imageWidth: number = 2560 / 5;
    imageHeight: number = 1600 / 5;

    imageIndex: number = 0;
    task: any;
    slides = document.getElementById('slides');
    imageCover: any;

    constructor(p: params) {
        if (instances.length === 1) {
            throw new Error('Class Slides Can Be New Only Once! ')
        } else {
            instances.push(this);
        }
        if (p.width && p.height) {
            this.imageWidth = p.width;
            this.imageHeight = p.height;
        }

        this.imgs = p.imgs;
        this.InitHtml();
        this.InitImageSize();
        this.manualSlide();
        // 开启自动播放
        if (p.ifAutoPlay) {
            let intervalTime = p.autoPlayIntervalTime || 2000;
            this.autoSlide(intervalTime);
        }
    }

    // 指定某页
    selectPic() {
        if (this.imageCover) {
            this.imageCover.style.left = `-${this.imageWidth * this.imageIndex}px`
        }
        this.addStyle(".icons span", this.imageIndex, "focus_icon");
    }
    // 下一页
    nextPic() {
        ++this.imageIndex;
        if (this.imageIndex >= this.imgs.length) {
            this.imageIndex = 0;
        }
        this.selectPic()
    }
    // 上一页
    prevPic() {
        --this.imageIndex;
        if (this.imageIndex <= -1) {
            this.imageIndex = this.imgs.length - 1;
        }
        this.selectPic()
    }

    // 给指定的元素组中的某一个元素添加类
    // 给icons中的index=2的icon添加focus_icon类
    addStyle(selector: string, dataIndex: number, styleName: string) {
        let IMGS = Array.from(document.querySelectorAll<HTMLElement>(selector))
        IMGS.forEach(item => {
            let index = +String(item.dataset.index);
            if (index === dataIndex) {
                item.classList.add(styleName);
            } else {
                item.classList.remove(styleName);
            }
        })
    }

    // 初始化HTML结构
    InitHtml() {
        /*
        <div id="slides">
            <div class="images">
                <img class="image" src="" >
            </div>
            <div class="icons">
                <span class="icon"></span>
            </div>
            <div class="arrow">
                <div class="left">
                <div class="right">
            </div>
        </div>
        */
        if (!this.slides) throw Error("Can't Get Slides");

        this.slides.innerHTML = `
        <div class="images">
            ${this.imgs.map((item, index) => {
            return `
                    <img class="image" src="${item}" data-index = ${index}>
                `
        }).join('')}
        </div>

        <div class="icons">
            ${this.imgs.map((item, index) => {
            return `<span class="icon" data-index=${index}></span>`
        }).join('')}
        </div>

        <div class="arrow">
            <div class="left">&lt;</div>
            <div class="right">&gt;</div>
        </div>
        `
        this.imageCover = document.querySelector<HTMLElement>(".images") as HTMLElement;
        if (!this.imageCover) throw Error("Can't Get Image");
        // 添加基础样式类
        this.addStyle(".icons span", this.imageIndex, "focus_icon");


    }

    InitImageSize() {
        // 初始化图片宽度
        if (!this.slides) return;
        this.slides.style.width = `${this.imageWidth}px`
        this.slides.style.height = `${this.imageHeight}px`

        let images = Array.from(document.querySelectorAll<HTMLElement>("#slides .images img"))
        images.forEach(item => {
            item.style.width = `${this.imageWidth}px`
            item.style.height = `${this.imageHeight}px`
        })
    }

    // 手动轮播
    manualSlide() {
        document.body.addEventListener('click', (e) => {
            let target = e.target as HTMLTextAreaElement;
            let tagName = target.tagName;
            let className = target.className;
            // 指定张
            if (tagName === "SPAN") {
                this.imageIndex = +String(target.dataset.index);
                this.selectPic()
            }
            // 下一张
            if (tagName === "DIV" && className === "right") {
                this.nextPic()
            }
            // 上一张
            if (tagName === "DIV" && className === "left") {
                this.prevPic()
            }
        })
    }
    // 自动轮播
    autoSlide(intervalTime: number) {
        this.task = setInterval(() => {
            this.nextPic();
        }, intervalTime)
        // 鼠标进入，取消自动轮播
        if (!this.slides) throw Error("Can't Get Slides");
        this.slides.addEventListener('mouseover', () => {
            clearInterval(this.task);
        })
        // 鼠标出去，开启自动轮播
        this.slides.addEventListener('mouseout', () => {
            this.task = setInterval(() => {
                this.nextPic();
            }, intervalTime)
        })
    }
}


export default Slides;