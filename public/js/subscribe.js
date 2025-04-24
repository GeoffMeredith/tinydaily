"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscribeForm');
    const messageDiv = document.getElementById('subscriptionMessage');
    if (!form || !messageDiv)
        return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = form.elements.namedItem('email');
        const preferredEmailHour = form.elements.namedItem('preferredEmailHour');
        if (!emailInput)
            return;
        try {
            const response = await fetch('/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailInput.value,
                    preferredEmailHour: preferredEmailHour.value
                })
            });
            const data = await response.json();
            messageDiv.textContent = data.message;
            messageDiv.className = response.ok ? 'success' : 'error';
            if (response.ok) {
                form.reset();
            }
        }
        catch (error) {
            messageDiv.textContent = 'Error processing subscription';
            messageDiv.className = 'error';
        }
    });
});
