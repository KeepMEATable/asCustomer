export default function() {
    Notification.requestPermission().then(() => {
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.getRegistration().then((reg) => {
                if (undefined === reg) {
                    return;
                }

                const options = {
                    body: 'You can go!',
                    vibrate: [5000, 1000, 5000, 1000, 5000],
                };

                reg.showNotification('Table\'s ready!', options);
            });
        }
    });
}
