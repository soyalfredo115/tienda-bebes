document.addEventListener('DOMContentLoaded', ()=>{
  const loginForm = qs('#login-form');
  const regForm = qs('#register-form');

  if(loginForm){
    const hint = qs('#login-hint');
    loginForm.addEventListener('submit', e=>{
      e.preventDefault();
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value.trim();
      const res = loginUser({email,password});
      if(!res.ok){
        hint.textContent = res.msg;
        hint.className = 'form-hint error';
      } else {
        location.href = 'index.html';
      }
    });
  }

  if(regForm){
    const hint = qs('#register-hint');
    regForm.addEventListener('submit', e=>{
      e.preventDefault();
      const name = regForm.name.value.trim();
      const email = regForm.email.value.trim();
      const password = regForm.password.value.trim();
      if(!isValidEmail(email)){
        hint.textContent = 'Ingresa un correo válido.';
        hint.className = 'form-hint error';
        return;
      }
      if(password.length < 4){
        hint.textContent = 'La contraseña debe tener al menos 4 caracteres.';
        hint.className = 'form-hint error';
        return;
      }
      const res = registerUser({name,email,password});
      if(!res.ok){
        hint.textContent = res.msg;
        hint.className = 'form-hint error';
      } else {
        location.href = 'index.html';
      }
    });
  }
});