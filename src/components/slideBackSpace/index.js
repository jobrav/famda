let startingY;

let his;

// functions

// close infocard: go to prev url
const closeCard = props => {
  his.goBack();
};
const sbs = (history, obj) => {
  his = history;
  const e = obj.children[0];
  e.addEventListener("touchstart", sbsStart, false);
  e.addEventListener("touchmove", sbsMove, false);
  e.addEventListener("touchend", sbsEnd, false);
};

const sbsStart = e => {
  startingY = e.touches[0].clientY;
  const card = e.currentTarget;
  card.style.transition = "";
};
const sbsMove = e => {
  const card = e.currentTarget;
  const touch = e.touches[0];
  const change = touch.clientY - startingY;
  if (change >= 0) {
    card.style.transform = `translateY(${change}px)`;
  }
};
const sbsEnd = e => {
  //params
  const card = e.currentTarget;
  const touch = e.changedTouches[0];
  const change = touch.clientY - startingY;
  const threshold = window.innerHeight * 0.2;
  // if true, close card
  if (change > threshold) {
    card.removeEventListener("touchstart", sbsStart);
    card.removeEventListener("touchmove", sbsMove);
    card.removeEventListener("touchend", sbsEnd);
    closeCard();
  } else {
    card.style.transition = "all 150ms ease-in-out";
    card.style.transform = "";
  }
};
export default sbs;
