export function flash(content,type = 'success'){
  const flash = document.getElementById(`flash-${type}`)
  flash.classList.remove('hidden-flash')
  flash.classList.add('visible-flash')
  flash.querySelector('.flash-content').innerText = content
  setTimeout(() => {
      flash.classList.replace('visible-flash', 'hidden-flash')
  }, 5000)
}
