const inputs = document.querySelectorAll('.input');
const submitBtn = document.querySelector('.submit-btn');
const label = document.querySelectorAll('.label');
const elementDiv = document.querySelectorAll('.input-container');

const inputValue = {
    value1: 'hello',
    value2: 'world'
}

const focusElement = (index) => {
    label.item(index).className = 'label activeLabel';
    elementDiv.item(index).style.border = '1px solid blue';
    inputs.item(index).placeholder = '';
}

const leaveFocus = (index) => {
    console.log(index);
    if (inputs.item(index).value === '' || inputs.item(index).value === null){
        label.item(index).className = 'label';
        elementDiv.item(index).style.border = '1px solid grey';
        if (index === 0){
            inputs.item(index).placeholder = 'New Password';
        }
        else {
            inputs.item(index).placeholder = 'Confirm Password';
        }
    }
}

const passwordValidator = () => {
    if ((inputValue.value1 && inputValue.value2) && (inputValue.value1 === inputValue.value2)){
        submitBtn.disabled = false;
    }
    else {
        submitBtn.disabled = true;
    }
}

const handleInput = (event, index) => {
    if (index === 0){
        inputValue.value1 = event.target.value;
    }
    else {
        inputValue.value2 = event.target.value;
    }
    passwordValidator()
}
