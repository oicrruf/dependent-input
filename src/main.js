const form = document.querySelector('form')

const questions = fetch('./inputs.json')
  .then(response => response.json())
  .then(inputs => renderInputs(inputs, hidden))
  .catch(error => console.log(error));

const getId = (input) => {
  let regex = /\d+/g;
  let str = input.target.id;
  return regex.exec(str)[0]
}

let isParent = (input) => {
  let inputs = Array.from(document.querySelectorAll('input'))

  inputs.map(child => {
    // console.log(getId(input), child)
  })

}

const focus = (input) => {
  input.addEventListener('focus', (e) => {
    e.target.parentElement.classList.add('active')
    isParent(e)
  })
}

const blur = (input, index) => {
  input.addEventListener('blur', (e) => {
    e.target.parentElement.classList.remove('active')
    e.target.value != '' ? childrens(e.target, 'show', index) : childrens(e.target, 'hidden', index)
  })
}

const childrens = (input, action, index) => {
  let inputs = Array.from(document.querySelectorAll('input'))
  let regex = /\d+/g;
  let str = input.getAttribute('id');
  let id = regex.exec(str)[0]
  let next = Array.from(document.querySelectorAll('input'))[index + 1]

  inputs.map((children) => {
    if (children.classList.value.split(' ').indexOf(`child-${id}`) != -1) {
      switch (action) {
        case 'show':
          children.parentElement.removeAttribute('hidden');
          input.classList.add('active')
          children.classList.add('active')
          next.focus()
          break;
        case 'hidden':
          children.parentElement.setAttribute('hidden', '');
          input.classList.remove('active')
          children.classList.remove('active')
          next.focus()
          break;
        // default:
        //   // input.classList.remove('active')
        //   // children.classList.remove('active')
        //   // next.focus()
        //   break;
      }
    }
  })

}

const hidden = () => {
  let inputs = Array.from(document.querySelectorAll('input'))
  inputs.map((input) => {
    let regex = /child-[0-9]/gm;
    let str = input.classList.value;
    regex.exec(str) && input.parentElement.setAttribute('hidden', '')
  })
}

/**
 * Renderiza los inputs a partir del JSON de configuracion
 * @constructor
 * @param {Array} inputs - Contiene todos los datos de los inputs que se van a generar
 * @param {Function} callback - Callback de la funcion hidden que oculta los inputs hijos
 */
const renderInputs = (inputs, callback) => {
  inputs.map((data, index) => {
    let { id, required, className, question, type } = data.attributes;
    let div = document.createElement('div')
    let label = document.createElement('label')
    let input = document.createElement('input')
    let span = document.createElement('span')
    let classNames = className.split(' ')
    span.innerText = required ? '*' : ''
    div.classList.add('col-lg-3', 'mb-4')
    classNames.map(c => input.classList.add(c))
    label.innerText = question;
    required && label.appendChild(span)
    label.classList.add('form-label', 'mb-2')
    label.setAttribute('for', id)
    input.setAttribute('id', id)
    input.setAttribute('type', type)
    required && input.setAttribute('required', '')
    div.appendChild(label)
    div.appendChild(input)
    form.appendChild(div)
    focus(input)
    blur(input, index)
  })
  callback()
}

