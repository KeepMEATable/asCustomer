export default interface WaitingLine {
    customerId: string;
    ready: boolean;
    started: boolean;
    waiting: boolean;
    awaitStartedAt: any;
    holder: {
        estimatedDelay: number,
    };
}
