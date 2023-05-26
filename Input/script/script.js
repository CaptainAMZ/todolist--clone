const inputContainer = document.querySelectorAll(".input-Container");
const inputs = document.querySelectorAll("input");

inputs.forEach((item, index) => {
  item.addEventListener("input", function () {
    console.log(RegExp(this.attributes.reg.value));
    this.value.match(RegExp(this.attributes.reg.value))
      ? inputContainer[index].classList.remove("input-error")
      : inputContainer[index].classList.add("input-error");
  });
});


