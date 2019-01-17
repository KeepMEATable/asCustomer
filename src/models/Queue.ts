export default interface Queue {
    customerId: string;
    ready: boolean;
    started: boolean;
    waiting: boolean;
}
