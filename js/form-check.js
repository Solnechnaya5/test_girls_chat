document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.registration-form');
    const inputs = form.querySelectorAll('.check-input');
    const errorSpans = form.querySelectorAll('.input-error');
    const submitButton = form.querySelector('.registration-form__btn');

    function validateInputs(event) {
        let formIsValid = true;

        inputs.forEach((input, index) => {
            const value = input.value.trim();
            const errorSpan = errorSpans[index];

            if (value === '') {
                errorSpan.textContent = 'This field is required';
                formIsValid = false;
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                errorSpan.textContent = 'Please use Latin characters';
                formIsValid = false;
            } else {
                errorSpan.textContent = '';
            }
        });

        if (formIsValid) {
            window.location.href = 'users.html';
        } else {
            event.preventDefault();
        }
    }

    submitButton.addEventListener('click', validateInputs);
});