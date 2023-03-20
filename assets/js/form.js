

export function createInput(fieldName, type, value){
    const wrapper = document.createElement('div');

    const input = document.createElement('input');
    input.id = fieldName;
    input.name = fieldName;
    input.type = type;
    input.value = value || '';

    const label = document.createElement('label');
    label.innerText = fieldName;
    label.for = fieldName;

    wrapper.append(label, input)

    return wrapper; 
}

export function createForm(inputsParams, titleText, onSubmit){
    const form = document.createElement('form');
    form.addEventListener('submit', onSubmit);
    const submitBtn = document.createElement('button');
    submitBtn.innerText = 'save';
    submitBtn.classList.add('submitBtn');
    

    const inputs = inputsParams.map(({fieldName, type, value}) => 
    createInput(fieldName, type, value));
    const title = document.createElement('h2');
    title.innerText = titleText;

    form.append(title, ...inputs, submitBtn);

    return form;
}