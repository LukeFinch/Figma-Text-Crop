/**
 * Implementation built on top of @create-figma-plugin/utilities event handlers
 */

export type MessageHandler = {
  name: string;
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  handler: (...args: any) => void;
};

export const messageHandlers: Record<string, MessageHandler> = {};

let currentId: number = 0;

/**
 * Calling `emit` in the [main context](https://figma.com/plugin-docs/how-plugins-run/) invokes the event
 * handler for the matching event `name` in your UI. Correspondingly, calling
 * `emit` in your UI invokes the event handler for the matching event `name`
 * in the main context.
 *
 * All `args` passed after `name` will be directly
 * [applied](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
 * on the event handler.
 *
 *
 * @category Events
 */
export const emitMessage = <Handler extends MessageHandler>(
  name: Handler['name'],
  arg?: Parameters<Handler['handler']>,
): void => {
  window.parent.postMessage(
    {
      pluginMessage: [name, arg],
    },
    'https://www.figma.com', //  Only accept messages that come from the figma.com origin
  );
};

/**
 * Registers an event `handler` for the given event `name`.
 *
 * @returns Returns a function for deregistering the `handler`.
 * @category Events
 */
export const registerMessageHandler = <Handler extends MessageHandler>(
  name: Handler['name'],
  handler: Handler['handler'],
) => {
  const id = `${currentId}`;
  currentId += 1;
  messageHandlers[id] = {handler, name};
  return (): void => {
    delete messageHandlers[id];
  };
};

/**
 * Triggers a named event with given arguments
 * Named events are stored in {@link messageHandlers} and registered with {@link on}
 * @param name Name of the handler
 * @param args Arguments to be passed to the handler
 */
export const invokeMessageHandler = (
  name: string,
  args: Array<unknown>,
): void => {
  for (const id in messageHandlers) {
    if (messageHandlers[id].name === name) {
      messageHandlers[id].handler.apply(null, args);
    }
  }
};
