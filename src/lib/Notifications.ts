/*tslint:disable:no-shadowed-variable no-console*/

export default function(topic: string) {
    Notification.requestPermission().then(() => {
        if (Notification.permission === 'granted') {

            navigator.serviceWorker.getRegistration().then((reg) => {
                const es = new EventSource(`https://mercure.keepmeatable.dev/hub?topic=${topic}`);
                es.onmessage = (e) => {
                    console.log(e);

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
                };
            });
        }
    });
}
