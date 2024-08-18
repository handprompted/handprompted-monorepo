# `withAccessControl` Function Documentation

## Overview

The `withAccessControl` function is designed to wrap actions that require certain user permissions. If the user does not meet the requirements, the appropriate flow (e.g., login, payment) will be started. This function is useful for ensuring that actions are only performed by users who have the necessary permissions.

## Function Signature

```ts
function withAccessControl(
  action: ActionFunction,
  resource: ActionResource,
  options?: {
    onBeforeAction?: BeforeActionFunction;
    onFallbackAction?: FallbackActionFunction;
  },
): ActionFunction;
```

## Parameters

- `action` (`ActionFunction`): The function to be performed if the user meets the requirements.
- `resource` (`ActionResource`): The resource of the action, containing the type and additional information.
  - `kind` (`'user' | 'flip' | 'spin'`): The type of resource.
  - `object` (`{ policies: AccessPolicy[], [key: string]: any }`): The resource itself (Flip, Spin, etc...). It may have any properties, as long as it has a `policies` property.
- `options` (`Options`, optional): An optional object containing options for the `withAccessControl` function.
  - `onFallbackAction` (`FallbackActionFunction`, optional): An optional function to execute if the user does not meet the requirements.
  - `onBeforeAction` (`BeforeActionFunction`, optional): An optional function to execute before the main action. This can handle complex setups or replay previous actions.

## Returns

- `ActionFunction`: A wrapped action function with the same signature as the original action function.

# Example Usage

The `withAccessControl` function can be imported from `~/libs/auth`:

```tsx
import {withAccessControl} from '~/libs/auth/withAccessControl';
```

Also, assume that we have a `Flip` resource object which is the target of the action.

## Simple Example

```tsx
// The action that requires the user to be logged in and have a membership
const viewPremiumContent = () => {
  console.log('Viewing premium content');
};

// Wrap the action using withAccessControl
const wrappedAction = withAccessControl(viewPremiumContent, {
  kind: 'flip',
  object: flip,
});

// Use the wrapped function as an event handler
<Button onClick={wrappedAction}>View Premium Content</Button>;
```

## Example with `onFallbackAction`

```tsx
// Define a fallback action to be executed if the user does not meet the requirements
const showError = () => {
  alert('You need to upgrade your membership to download this content.');
};

// Define an action that requires user to be logged in and have a membership
const downloadContent = (spinId: string) => {
  console.log(`Downloading content ${spinId}`);
};

// Wrap the action using withAccessControl
const downloadContentWithAccessControl = withAccessControl(
  downloadContent,
  {kind: 'spin', object: spin},
  {onFallbackAction: showError},
);

// Use the wrapped function as an event handler
<Button onClick={downloadContentWithAccessControl(spin.id)}>
  Download Content
</Button>;
```

## Example with `onBeforeAction`

If you need to perform some setup before the action is executed, you can use the `onBeforeAction` parameter:

```tsx
// Define an action that requires user to be logged in and have a membership
const playVideo = (ts: number) => {
  console.log(`Playing video from: ${ts}`);
};

// Define a function to replay previous actions
const skipToTimestamp = (ts: number) => {
  console.log(`Skipping to timestamp: ${ts}`);
};

// Wrap the action using withAccessControl
const continuePlayingWithAccessControl = withAccessControl(
  playVideo,
  {kind: 'flip', object: flip},
  {onBeforeAction: skipToTimestamp},
);

// Use the wrapped function as an event handler
setTimeout(() => continuePlayingWithAccessControl(1000 * 30), 1000 * 30);
```
