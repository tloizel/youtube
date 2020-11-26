var bad = false;

window.addEventListener('devtoolschange', event => {
  if(event.detail.isOpen){
    bad = true;
    badboi();
  }
});

if(window.devtools.isOpen) {
  bad = true;
  badboi();
};

function badboi() {
  if (bad == true && window.innerWidth > 800) {
  document.getElementById("c").style.display = "block";
  }
};