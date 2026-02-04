class Video {
    constructor(title, uploader, time) {
        this.title = title;
        this.uploader = uploader;
        this.time = time;
    }

    watch() {
        console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
    }
}

const video1 = new Video("JavaScript Basics", "Alice", 120);
const video2 = new Video("CSS Grid Tutorial", "Bob", 300);

video1.watch();
video2.watch();

const videosData = [
    {title: "React Intro", uploader: "Charlie", time: 200},
    {title: "Node.js Crash Course", uploader: "Dana", time: 250},
    {title: "Python OOP", uploader: "Eve", time: 180},
    {title: "HTML Forms", uploader: "Frank", time: 150},
    {title: "Advanced JS", uploader: "Grace", time: 220},
];

const videosArray = videosData.map(video => new Video(video.title, video.uploader, video.time));

videosArray.forEach(video => video.watch());
