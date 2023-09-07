import './style.css'


const send = document.querySelector('#send')
const msg = document.querySelector('#msg')

send.addEventListener('click', ()=>{
  console.log('click')
  msg.classList.remove('hide')
})

