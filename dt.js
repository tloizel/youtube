var bad = false;

window.addEventListener('devtoolschange', event => {
  if(event.detail.isOpen){
    bad = true;
    console.log("it worked");
  }
});

if(window.devtools.isOpen) {bad = true};