window.addEventListener("resize", (event) => {
  setVectorsOfer();
});

function setVectorsOfer() {
  const pointsLeft = document.querySelector(".points-1");
  const pointsRight = document.querySelector(".points-2");

  if (window.innerWidth >= 650) {
    pointsLeft.src = "../../assets/vectors/points3.png";
    pointsRight.src = "../../assets/vectors/points4.png";
  } else {
    pointsLeft.src = "../../assets/vectors/points1.png";
    pointsRight.src = "../../assets/vectors/points2.png";
  }
}

setVectorsOfer();

function dragList(list) {
  function move(event) {
    list.scrollLeft += -1 * event.movementX;
  }

  list.addEventListener("mousedown", (event) => {
    event.preventDefault();
    list.addEventListener("mousemove", move);
  });

  list.addEventListener("mouseup", (event) => {
    event.preventDefault();
    list.removeEventListener("mousemove", move);
  });
}

const lists = document.querySelectorAll(".list-ul");

lists.forEach((list) => {
  dragList(list);
});
