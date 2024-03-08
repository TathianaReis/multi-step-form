console.log("hello");

const buttons = document.querySelectorAll("[data-bla-bla]");

console.log(buttons);

buttons.forEach((button) => {
  console.log(button.dataset);
  button.addEventListener("click", () => {
    const modalId = button.dataset.blaBla;
    const modal = document.getElementById(modalId);
    modal.classList.add("show");
    console.log(modalId);
    console.log(modal);
  });
});

// exemplo
//const matches = container.querySelectorAll("li[data-active='1']");

// const step = () => {};

// document.addEventListener("click", (e) => {
//   if (e.target.type === "") {
//     clearContainer(document.getElementById("results-container"));
//     return;
//   }
// });

// const highlightedItems = userList.querySelectorAll(".highlighted");

// highlightedItems.forEach((userItem) => {
//   deleteUser(userItem);
// });

//const stepsList = document.querySelectorAll(".step-item");
const stepsList = document.querySelectorAll("[data-step-section]");
const stepSectionList = document.querySelectorAll(".section-item");

//console.log(stepsList);

stepsList.forEach((stepItem, i) => {
  //console.log(stepItem);
  stepItem.addEventListener("click", function (e) {
    const sectionId = stepItem.dataset.stepSection;
    const sectionActive = document.getElementById(sectionId);

    stepsList.forEach((s, i) => {
      s.querySelector(".step-number").classList.remove("step-active");
    });

    stepSectionList.forEach((s, i) => {
      //console.log(s);
      // console.log(s.classList.contains("section-active"));
      //  s.querySelector(".section-item")?.classList.remove("section-active");
      s?.classList.remove("section-active");
    });

    //console.log(stepItem);
    //stepsList.forEach((s, i) => {
    //console.log(stepsList[i]?.querySelector(".step-active")); //////////////////////// -->> OLD ACTIVE
    //const disableSection =
    //   if (s.querySelector(".step-active")) {
    //     const disableSection = i;
    //   }
    // console.log(s);
    // console.log(s.querySelector(".step-number"));
    // s.querySelector(".step-number").classList.remove("step-active");
    //console.log(s);

    //   if (
    //     this.querySelector(".step-number") === s.querySelector(".step-number")
    //   )
    //     displaySection(i);
    //});
    console.log(sectionActive);
    sectionActive.classList.add("section-active");
    this.querySelector(".step-number").classList.add("step-active");
    //console.log(this);
  });
});

const displaySection = (sectionItem) => {
  // console.log(sectionItem); ////////////////////// -->> NEW ACTIVE
  //console.log(stepSectionList);
  //const currentActive = stepSectionList.querySelectorAll("li[data-active='1']");

  stepSectionList.forEach((s, i) => {
    console.log(s);
    console.log(s.classList.contains("section-active"));
    s.querySelector(".section-item")?.classList.remove("section-active");
  });
  // stepSectionList[sectionItem]
  //   .querySelector(".section-item")
  //   .classList.add("section-active");
};

// stepFormList.forEach((formItem) => {
//   formItem.addEventListener("click", function (e) {
//     stepFormList.forEach((f) => {
//       f.querySelector(".step-number").classList.remove("step-active");
//     });

//     this.querySelector(".step-number").classList.add("step-active");
//   });
// });

// stepsList.forEach((stepItem) => {
//   stepItem.addEventListener("click", function (e) {
//     //console.log(this.querySelector(".step-number"));
//     // if (
//     //   this.querySelector(".step-number") === s.querySelector(".step-number")
//     // ) {
//     //   this.querySelector(".step-number").classList.add("step-active");
//     // }
//     stepItem.forEach((s) => {
//       s.querySelector(".step-number").classList.remove("step-active");
//     });
//     this.querySelector(".step-number").classList.add("step-active");
//   });
// });

// console.log(steps);

// steps.forEach((s, i) => console.log(s, i));

// document.querySelector(".step-item").addEventListener("click", function (e) {
//   //console.log(e.currentTarget, e.target, this);
//   console.log(this.querySelector(".step-number"));
// });
