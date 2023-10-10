import './style.css'


const send = document.querySelector('#send')
const msg = document.querySelector('#msg')

send.addEventListener('click', ()=>{

  //get elements
  let name = document.getElementById('name').innerHTML.split(" ").join("")
  let email = document.getElementById('email').innerHTML.split(" ").join("")
  let subject = document.getElementById('subject').innerHTML
  let sofas = document.getElementById('Sofas')
  let bedding = document.getElementById('Bedding')

  //validade name regex
  const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "gm")
  const isValidEmail = emailRegex.test(email);
  
  //check if sofas or bedding are selectd
  let boxes = [sofas, bedding]
  let selected
  for (let i = 0; i < boxes.length; i++) {
   if(boxes[i].checked){
    selected = boxes[i].value
   }
  }
  
  //logic
  if(!isValidEmail){
    msg.innerHTML = 'That email does not appear valid'
    msg.classList.remove('hide')
    return
  }
  if(!selected){
    msg.innerHTML = 'Is your subject related to sofas or bedding? choose one of the two options'
    msg.classList.remove('hide')
    return
  }

  // send data to AQsmtp-api
  // dados a serem enviados pela solicitação POST

  let _data = {
    name: name,
    emailto: email, 
    bodymsg: subject,
    subject: selected,
    client:'aquinos-academy',
  }

  fetch('http://localhost:5000/aquinosgroupsiteautoemail', {
    method: "POST",
    body: JSON.stringify(_data),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json()) 
  .then(json => console.log(json))

  msg.innerHTML = 'Thanks! Check your email for more information.'
  msg.classList.remove('hide')

})

