var radius = 10;

function update(e){
    var x = e.clientX || e.touches[0].clientX
    var y = e.clientY || e.touches[0].clientY
  
    document.documentElement.style.setProperty('--radius', radius + 'vmax')
    document.documentElement.style.setProperty('--cursorX', x + 'px')
    document.documentElement.style.setProperty('--cursorY', y + 'px')
  }
  
  document.addEventListener('mousemove',update)
  document.addEventListener('touchmove',update)
  

function addTorch(){
    document.documentElement.className += ' torch'
}
  
function removeTorch(){
    document.documentElement.className -= ' torch'
}
  
function changeRadius(r){
    radius = r;
}