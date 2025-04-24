export class NotificationSystem {
    static init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'fixed top-4 right-4 z-50 space-y-2';
            document.body.appendChild(this.container);
        }
    }
    static show(message, type = 'success', duration = 3000) {
        this.init();
        const notification = document.createElement('div');
        notification.className = `px-4 py-2 rounded-lg shadow-lg text-white transform transition-all duration-300 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
        notification.textContent = message;
        this.container?.appendChild(notification);
        // Trigger animation
        requestAnimationFrame(() => {
            notification.classList.add('opacity-100', 'translate-y-0');
        });
        // Remove after duration
        setTimeout(() => {
            notification.classList.remove('opacity-100', 'translate-y-0');
            notification.classList.add('opacity-0', '-translate-y-2');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    }
}
NotificationSystem.container = null;
// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    NotificationSystem.init();
});
