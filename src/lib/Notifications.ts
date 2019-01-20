/*tslint:disable:no-shadowed-variable no-console*/

export default function(topic: string) {
    Notification.requestPermission().then(() => {
        if (Notification.permission === 'granted') {
            console.log('granted');
            navigator.serviceWorker.getRegistration().then((reg) => {
                console.log('es started with topic ', topic);
                const baseUrl = 'https://mercure.keepmeatable.dev/hub?topic=';
                const baseTopic = 'https://api.keepmeatable.dev:8443/queues/';
                const es = new EventSource(`${baseUrl}${baseTopic}${topic}`);
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
