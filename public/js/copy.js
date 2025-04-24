import { NotificationSystem } from './notifications.js';
document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copyButton');
    const blockquote = document.querySelector('blockquote');
    if (copyButton && blockquote) {
        copyButton.addEventListener('click', async () => {
            try {
                const text = blockquote.textContent?.trim() || '';
                await navigator.clipboard.writeText(text);
                // Show feedback
                const originalHTML = copyButton.innerHTML;
                copyButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                `;
                copyButton.classList.add('text-green-500');
                // Show notification
                NotificationSystem.show('Copied to clipboard!');
                // Reset button after 2 seconds
                setTimeout(() => {
                    copyButton.innerHTML = originalHTML;
                    copyButton.classList.remove('text-green-500');
                }, 2000);
            }
            catch (err) {
                console.error('Failed to copy text: ', err);
                NotificationSystem.show('Failed to copy text', 'error');
            }
        });
    }
});
