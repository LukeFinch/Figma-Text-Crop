import {useEffect} from 'react';
import {
  emitMessage,
  invokeMessageHandler,
  MessageHandler,
  registerMessageHandler,
} from './messageHandlers';

//We don't test the browser default behaviour

/* istanbul ignore next */
const onMessageHandler = (event: MessageEvent): void => {
  if (event.source && event.target && event.data.pluginMessage) {
    const [name, ...args]: [string, Array<unknown>] = event.data.pluginMessage;
    invokeMessageHandler(name, args);
  }
};

/**
 * Custom hook for {@link onMessageHandler} Handles incoming messages
 * When a message comes in
 * triggers {@link invokeMessageHandler}
 * Invoke the event
 */
export const useSetOnMessageListener = () => {
  useEffect(() => {
    /* istanbul ignore next */
    window.addEventListener('message', onMessageHandler);
  }, []);
};

/**
 * Custom Hook, wraps the `{@link registerMessageHandler} function
 * @param name Name of the message handler
 * @param handler Function to be called when recieving a message with `name`
 * @returns Returns a function for deregistering the `handler`.
 * @category Events
 */
export function useRegisterMessageHandler<Handler extends MessageHandler>(
  name: Handler['name'],
  handler: Handler['handler'],
) {
  useEffect(() => {
    const unregister = registerMessageHandler(name, handler);
    return () => unregister();
  }, [name, handler]);
}

/**
 * Custom Hook, wraps the {@link emitMessage} function
 * @param name Name of the handler
 * @param args Data to be bassed into the handler function
 * @emits postMessage
 * @category Events
 */
export const useEmitMessage = <Handler extends MessageHandler>(
  name: Handler['name'],
  arg?: Parameters<Handler['handler']>,
) => {
  useEffect(() => {
    emitMessage(name, arg);
  }, [name, arg]);
};
