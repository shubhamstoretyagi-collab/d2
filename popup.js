window.addEventListener('load', function(){
  const p = document.getElementById('popup');
  if(p){
    p.style.display='block';
    setTimeout(()=>p.style.display='none', 5000);
  }
});
