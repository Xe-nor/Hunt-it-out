const firebaseConfig = {
  apiKey: "AIzaSyAsb9QNKWqahW1VuM27UwkczaOFkMBkNqU",
  authDomain: "huntitout-512fe.firebaseapp.com",
  databaseURL:
    "https://huntitout-512fe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "huntitout-512fe",
  storageBucket: "huntitout-512fe.appspot.com",
  messagingSenderId: "123120591497",
  appId: "1:123120591497:web:b8f7351512ce7c9bff5c58",
  measurementId: "G-PV9FD53Y4B",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

const quizData = [
  {
    question:
      "You can find him at the end of the rainbow, with a golden pot. He is small and green, and wears a hat. Who is he? ",
    a: "Mermaids",
    b: "Púcas",
    c: "Banshees",
    d: "Leprechaun",
    clue: "https://www.irelandwide.com/irish-fairies/",
    correct: "d",
  },
  {
    question:
      "Starts with C and ends with N , used to make magical potions. What am I?",
    a: "Can",
    b: "Cauldron",
    c: "Corn",
    d: "Pot",
    clue: "https://www.amazon.co.uk/s?k=large+metal+pot+cooking&adgrpid=1178677420835606&hvadid=73667551878407&hvbmt=be&hvdev=c&hvlocphy=1669&hvnetw=o&hvqmt=e&hvtargid=kwd-73667515556273%3Aloc-90&hydadcr=19363_1840302&tag=mh0a9-21&ref=pd_sl_3mr9tkwc66_e",
    correct: "b",
  },
  {
    question: "What does Harry Potter have that Voldemort doesnt?",
    a: "friends",
    b: "nose",
    c: "talent",
    d: "broom",
    clue: "https://byjus.com/biology/sense-organs/",
    correct: "b",
  },
  {
    question:
      "It breathes fire and can fly high. If you train him and befriend this mighty beast, it can show you around. What is it?",
    a: "Phoenix",
    b: "Dragon",
    c: "F22 Raptor",
    d: "Crow",
    clue: "https://www.roots.gov.sg/ich-landing/ich/duan-wu-festival",
    correct: "b",
  },
  {
    question:
      "It is something so magical, it comes to you every night. It takes you places without actually moving you. To see it, you need to close your eyes first. What is it?",
    a: "Dream",
    b: "Santa",
    c: "Tooth Fairy",
    d: "Pillow",
    clue: "https://www.imdb.com/title/tt13814704/",
    correct: "a",
  },
];
let correctans = false;
let container = document.querySelector(".container");
let index = 0;
let correct = 0,
  incorrect = 0,
  total = quizData.length;
let questionBox = document.getElementById("questionBox");
let allInputs = document.querySelectorAll("input[type='radio']");
let cluebtn = document.getElementById("cluebtn");
const loadQuestion = () => {
  if (total === index) {
    // var user = auth.currentUser;
    // window.location.href = "index.html";
    var database_ref = database.ref();
    var user_data = {
      score: correct,
      total: total,
    };
    // Push to Firebase Database
    database_ref
      .child("users/" + firebase.auth().currentUser.uid)
      .update(user_data)
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
    return quizEnd();
  }
  reset();
  const data = quizData[index];
  document.querySelector(".container").style.zIndex = "-2";
  questionBox.innerHTML = `${index + 1}) ${data.question}`;
  allInputs[0].nextElementSibling.innerText = data.a;
  allInputs[1].nextElementSibling.innerText = data.b;
  allInputs[2].nextElementSibling.innerText = data.c;
  allInputs[3].nextElementSibling.innerText = data.d;
  cluebtn.setAttribute("href", data.clue);
};

document.querySelector("#submit").addEventListener("click", function () {
  const data = quizData[index];
  const ans = getAnswer();
  if (ans === data.correct) {
    correct++;
    correctans = true;
  } else {
    incorrect++;
  }
  index++;
  loadQuestion();
});

const getAnswer = () => {
  let ans;
  allInputs.forEach((inputEl) => {
    if (inputEl.checked) {
      ans = inputEl.value;
    }
  });
  return ans;
};

const reset = () => {
  allInputs.forEach((inputEl) => {
    inputEl.checked = false;
  });
};

const quizEnd = () => {
  document.getElementsByClassName("container")[0].innerHTML = `
  <div class="resultcontainer">
  <div class="col">
      <h3 class="resultout"> Hii, you've scored ${correct} / ${total} </h3>   
  </div>
  <div class="coll">  
  <a href="/index.html"> <button id="reset" onClick= "reset()"}>start again</button></a>
  </div>
  </div>
`;
};
loadQuestion(index);

///

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576
let levelcomplete = false;
let parsedCollisions;
let collisionBlocks;
let background;
let doors;
const player = new Player({
  imageSrc: "./img/king/idle.png",
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./img/king/idle.png",
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./img/king/idleLeft.png",
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./img/king/runRight.png",
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./img/king/runLeft.png",
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: "./img/king/enterDoor.png",
      onComplete: () => {
        levelcomplete = true;
        //
        if (levelcomplete) {
          document.querySelector(".container").style.zIndex = "2";
        }
        //
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++;

            if (level === 4) level = 1;
            levels[level].init();
            player.switchSprite("idleRight");
            player.preventInput = false;
            gsap.to(overlay, {
              opacity: 0,
            });
          },
        });
      },
    },
  },
});

let level = 3;
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/levels/backgroundLevel1.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 767,
            y: 270,
          },
          imageSrc: "./img/levels/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 96;
      player.position.y = 140;

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/levels/backgroundLevel2.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 772.0,
            y: 336,
          },
          imageSrc: "./img/levels/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 750;
      player.position.y = 230;
      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/levels/backgroundLevel3.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 176.0,
            y: 335,
          },
          imageSrc: "./img/levels/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
};

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const overlay = {
  opacity: 0,
};

function animate() {
  window.requestAnimationFrame(animate);

  background.draw();
 
  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);
  player.draw();
  player.update();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

levels[level].init();
animate();
