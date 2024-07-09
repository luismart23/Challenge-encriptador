document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const encryptButton = document.getElementById('encrypt-button');
    const decryptButton = document.getElementById('decrypt-button');
    const copyButton = document.getElementById('copy-button');

    const validateText = (text) => {
        const regex = /^[a-z0-9\s]+$/i;  // Permitir letras mayúsculas y minúsculas junto con números y espacios
        return regex.test(text);
    };

    const showAlert = (message) => {
        alert(message);
    };

    const encryptText = (text) => {
        if (!validateText(text)) {
            showAlert('Solo se permiten letras, números y espacios.');
            return '';
        }
        return btoa(text);  // Simple Base64 encoding
    };

    const decryptText = (text) => {
        try {
            return atob(text);  // Simple Base64 decoding
        } catch (e) {
            return '';  // Si ocurre un error, devolvemos una cadena vacía
        }
    };

    encryptButton.addEventListener('click', () => {
        const text = inputText.value;
        if (text) {
            outputText.textContent = encryptText(text);
            inputText.value = '';  // Limpiar el texto de entrada
        } else {
            showAlert('Por favor, ingresa un texto para cifrar.');
        }
    });

    decryptButton.addEventListener('click', () => {
        const text = outputText.textContent;
        if (text) {
            const decryptedText = decryptText(text);
            if (decryptedText) {
                inputText.value = decryptedText;  // Mover el texto desencriptado al cuadro de texto de entrada
                outputText.textContent = '';  // Limpiar el cuadro de texto de salida
            } else {
                showAlert('El texto no está en un formato válido para descifrar.');
            }
        } else {
            showAlert('Por favor, ingresa un texto cifrado para descifrar.');
        }
    });

    copyButton.addEventListener('click', () => {
        const text = outputText.textContent;
        if (text) {
            navigator.clipboard.writeText(text)
                .then(() => showAlert('Texto copiado al portapapeles'))
                .catch(() => showAlert('Error al copiar el texto'));
        } else {
            showAlert('No hay texto para copiar.');
        }
    });
});
