let room = {
    current: {},
    allRooms: [],
    set: function(roomObj) { this.current = roomObj; },
    setAll: function(roomsArr) { this.allRooms = roomsArr },
    setDefault: function() { this.current = this.allRooms.find(el => el.x === 0 && el.y === 0 ); },
    getAll: function() {return this.allRooms; },
    getCurrent: function() { return this.current; },
    get: function(x,y) { return this.allRooms.find(el => el.x === x && el.y === y ); }
}

let minimap = {
    mapContentDiv: document.querySelector('.minimap > .content-container'),
    focus: { x: 0, y: 0 },
    x: {min: 0, max: 0},
    y: {min: 0, max: 0},
    width: 0,
    height: 0,
    setAreaLimits: function() {
        let allRooms = room.getAll();
        allRooms.map(el => {
            this.x.min = el.x < this.x.min ? el.x : this.x.min;
            this.x.max = el.x > this.x.max ? el.x : this.x.max;
            this.y.min = el.y < this.y.min ? el.y : this.y.min;
            this.y.max = el.y > this.y.max ? el.y : this.y.max;
        });
    },
    buildGrid: function() {
        this.setAreaLimits();
        for (let y = this.y.max; y >= this.y.min; y--) {
            let width = 0;
            for (let x = this.x.min; x <= this.x.max; x++) {
                let newDiv = document.createElement('div')
                let foundRoom = room.get(x, y);
                if (foundRoom) {
                    let roomImg = document.createElement('img');
                    roomImg.src = foundRoom.img;
                    newDiv.appendChild(roomImg);
                }
                this.mapContentDiv.appendChild(newDiv);
                width += 1;
            }
            this.width = width;
            this.height += 1;
        }
        let largestSide = this.width > this.height ? this.width : this.height;
        let percentSize = 95 / largestSide;
        this.mapContentDiv.setAttribute('style', `grid-template: repeat(${this.height}, ${percentSize}%) / repeat(${this.width}, ${percentSize}%)`);
    },
}

function handleInput(e) {
    switch(e.code) {
        case 'KeyW':
            navigator.up();
            break;
        case 'KeyS':
            navigator.down();
            break;
        case 'KeyA':
            navigator.left();
            break;
        case 'KeyD':
            navigator.right();
            break;
        default:
            break;
    }
}

let navigator = {
    up: function() { switchRoom(0,1); },
    down: function() { switchRoom(0,-1); },
    left: function() { switchRoom(-1,0); },
    right: function () { switchRoom(1,0); }
}

function switchRoom(modX,modY) {
    let {x, y} = room.getCurrent();
    let newX = x + modX;
    let newY = y + modY;
    let newRoom = room.get(newX, newY);
    if (newRoom){
        room.set(newRoom);
        updateView();
    } else {
        console.log('No room found');
    }
}

function updateView() { 
    let currentRoom = room.getCurrent();
    document.querySelector('.view img').setAttribute('src', currentRoom.img);
    document.querySelector('.details p').innerHTML = currentRoom.details;
    document.querySelectorAll('.minimap .content-container > div > img').forEach(img => {
            if (img.src === currentRoom.img) {
                img.parentNode.classList.add('focus');
            } else {
                img.parentNode.classList.remove('focus');
            }
        });
}

function selectFile() {
    fileElement = document.getElementById('fileElement');
    if (fileElement) {
        fileElement.click();
    }
}

function uploadFile() { 
    if (this.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) { 
            let result = JSON.parse(e.target.result);
            room.setAll(result);
            room.setDefault();
            minimap.buildGrid();
            updateView();
        }
        reader.readAsText(this.files[0]);
    } 
}

function runDemo() {
    let demoLevel = JSON.parse(demo);
    room.setAll(demoLevel);
    room.setDefault();
    minimap.buildGrid();
    updateView();
}


function init() { 
    document.onkeypress = handleInput;
    document.getElementById('uploadBtn').addEventListener('click', selectFile);
    document.getElementById('demoBtn').addEventListener('click', runDemo)
    document.getElementById('fileElement').addEventListener('change', uploadFile);
}

init();


