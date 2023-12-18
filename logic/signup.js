const signInBtn = document.getElementById("signin-btn");
signInBtn.addEventListener("click", function(){ window.location.href="/"; });

const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const password2= document.getElementById('password2');
var valid = new Boolean(true);

form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    validateInputs();

    const requestBody = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        username: username.value,
        password: password.value,
    };

//   console.log(requestBody);
   if(valid)
   {
    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            console.log('Signup successful');
            window.location.href="/";
        }else if(response.status == 409) 
        {
            console.log("User already exist")
        }
        else {
            console.error('Signup failed');
           
        }
    } catch (error) {
        console.error('Error during signup:', error);
        // Handle the error, show an error message, etc.
    }
   }
   else{
    console.log("Invalid Input");
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

const isEmailValid = (email)=>{
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    return re.test(String(email).toLowerCase());
}

const isPasswordValid = (password)=>{
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    return re.test(String(password));
}

const validateInputs = ()=>{
    const fname = firstname.value.trim();
    const lname = lastname.value.trim(); 
    const emailvalue = email.value.trim();
    const uname = username.value.trim();
    const pass = password.value.trim();
    const pass2 = password2.value.trim();

    if(fname===''){
        setError(firstname,'Firstname is required!');
        valid = valid && false;
    }else{
        setSuccess(firstname);
        valid = valid && true;
    }

    if(lname===''){
        setError(lastname,'Lastname is required!');
        valid = valid && false;
    }else{
        setSuccess(lastname);
        valid = valid && true;
    }

    if(uname===''){
        setError(username,'Username is required!');
        valid = valid && false;
    }else{
        setSuccess(username);
        valid = valid && true;
    }

    if(emailvalue === ''){
        setError(email,'Email is required!');
        valid = valid && false;
    }else if(!isEmailValid(emailvalue)){
        setError(email,'Enter a valid email');
        valid = valid && false;
    }else{
        setSuccess(email);
        valid = valid && true;
    }
    if(pass === ''){
        setError(password,'Password is required!');
        valid = valid && false;
    }else if(!isPasswordValid(pass)){

        setError(password,'Password must at least 8 character and have lowercase,uppercase,special character & number')
        valid = valid && false;
    }
    else{
        setSuccess(password);
        valid = valid && true;
    }

    if(pass2 === ''){
        setError(password2,'Please confirm your password');
        valid = valid && false;
    }else if(pass2!== pass){
        setError(password2,'Password does not match')
        valid = valid && false;
    }else{
        setSuccess(password2);
        valid = valid && true;
    }
}
