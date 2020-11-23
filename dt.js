var bad = false;

window.addEventListener('devtoolschange', event => {
  if(event.detail.isOpen){
    bad = true;
  }
});

if(window.devtools.isOpen) {bad = true};