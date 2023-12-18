const signup = document.getElementById("signup-btn")
signup.addEventListener("click",()=>{
    window.location.href="/signup";
})
const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    validateInputs();

    const requestBody = {
        email: email.value,
        password: password.value,
    };

//   console.log(requestBody);
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            const responseData = await response.json(); 
            // console.log(responseData);
            console.log('Login successful');
            localStorage.setItem("userData",JSON.stringify(responseData.data));
            window.location.href="/home";
        } else {
            console.error('Login failed');
           
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});


const setError = (element,message)=>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const validateInputs = ()=>{
    const emailvalue = email.value.trim();
    const pass = password.value.trim();
    
    if(emailvalue === ''){
        setError(email,'Email is required!');
    }else{
        setSuccess(email);
    }
    if(pass === ''){
        setError(password,'Password is required!');
    }
    else{
        setSuccess(password);
    }

   
}