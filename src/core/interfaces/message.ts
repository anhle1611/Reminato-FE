export type Message = {
    type: 'success' | 'error' | 'info' | 'warning' | 'open' | 'destroy',
    title: string,
    content: string,
};

export interface MessageState {
    message?: Message
}