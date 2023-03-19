# Script

React is a JavaScript library for building user interfaces. In React, we build our web applications using components. A component represents something that can be shown on screen. Components include buttons, menus, tabs, alerts, loading screens and more. Components are reusable, meaning that if you build a compnent once, you can use it in multiple places in your application. Components can render HTML elements, other compnents, or both.

Since components can render other components, we can also use them to represent larger parts of our app. They can range in size from a single button to a full page.

Let's look at how to break down a web application into components. We will be using the Discord user interface as an example. We will oversimplify a bit to avoid taking too long.

![Discord UI](public/discord.png)

First, on the left, we have the `ServerPanel`. The `ServerPanel` contains all of our `ServerButton`s, which we could click on to view a server. Next we have the `ChannelPanel`, which contains many `ChannelButton`s, which would take you to each channel. To the right of that we have our `ChatPanel`. This `ChatPanel` contains numerous `ChatMessage`s, consisting of `Text` and `Avatar`. It also contains a `SendForm` which contains `IconButtons` and a `TextField`. Finally, on the far right, we have the `UserPanel`, consisting of `Users`, made up of `Avatar`s and `Text`.

Now let's look at how we would implement a component. We write components in the language of JSX, which extends JavaScript with HTML-like elements.

```jsx
function ChatMessage() {
    return (
        <div className="chat-message">
            <img className="chat-message-avatar" src="...">
            <p className="chat-message-username">Kidney</p>
            <p className="chat-message-content">i love gaslighting ai</p>
        </div>
    )
}
```

One thing to note is that instead of using `class` like in normal HTML, we use `className`. `className` behaves exactly the same as the `class` attribute for our purposes. Now that we have created a component we can use it in another component.

```jsx
function ChatPanel() {
  return (
    <div className="chat-panel">
      <ChatMessage />
    </div>
  );
}
```

We can also use this component multiple times.

```jsx
function ChatPanel() {
  return (
    <div className="chat-panel">
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
    </div>
  );
}
```

Notice that each component gives exactly the same result, and saves us having to type those HTML elements out multiple times. This is the power of components. However, sometimes we would like our components to have data that we can pass in to that component, which can change our result. These parameters are called props. For example, we would like to be able to pass in the user and content of the message to the `ChatMessage` component.

```jsx
function ChatMessage(props) {
    return (
        <div className="chat-message">
            <img className="chat-message-avatar" src={props.user.avatar}>
            <p className="chat-message-username">{props.user.name}</p>
            <p className="chat-message-content">{props.content}</p>
        </div>
    )
}
```

Notice the use of brackets `{}` to embed JavaScript expressions in JSX. A JavaScript expression is any piece of code that evaluates to a value. You could think of it as anything that we could put as the right hand side of an assignment statement. For example, `2 + 2` is a JavaScript expression, and so is `user.name`.

In this example, we are getting the `user` and `content` props and using them in our component. Let's see how we can use this component with props.

```jsx
const user = {
  name: "Kidney",
  avatar:
    "https://cdn.discordapp.com/avatars/754552555211718826/116718595b634f4591125c00a3d070d3.webp?size=80",
};

function ChatPanel() {
  return (
    <div className="chat-panel">
      <ChatMessage user={user} content="ok" />
      <ChatMessage user={user} content="i love gaslighting ai" />
    </div>
  );
}
```

To make a more faithful reproduction of the original UI we can hide the avatar and username for messages that are sent by the same user as the previous message. To do this, let's add a `hideUserDetails` prop to our component.

```jsx
function ChatMessage(props) {
    return (
        <div className="chat-message">
            {!props.hideUserDetails && (
                <>
                    <img className="chat-message-avatar" src={props.user.avatar}>
                    <p className="chat-message-username">{props.user.name}</p>
                </>
            )}
            <p className="chat-message-content">{props.content}</p>
        </div>
    )
}
```

Notice the use of the `&&` operator. This is a JavaScript operator that allows us to conditionally render elements. If the expression on the left is true, then the expression on the right will be rendered. If the expression on the left is false, then nothing will be rendered. Also notice the use of the `<>` element. This is a shorthand for `<React.Fragment>`. It allows us to render multiple elements without having to wrap them in a parent element. Now, let's use this prop in our `ChatPanel`.

```jsx
// ...

function ChatPanel() {
  return (
    <div className="chat-panel">
      <ChatMessage user={user} content="ok" />
      <ChatMessage
        user={user}
        content="i love gaslighting ai"
        hideUserDetails
      />
    </div>
  );
}
```

When we write a prop like this without any value, it is assumed to be `true`. This is a common pattern in React.

Now let's talk about state. State is a way for us to store data in our components. This data can change over time, and be modified by user interactions. A chat application has many complex pieces of state, so to understand state, we will start off with something more simple. Let's create a component that displays a counter.

```jsx
function Counter() {
  let count = 0;

  return (
    <div className="counter">
      <p className="counter-value">{count}</p>
      <button
        className="counter-button"
        onClick={() => {
          count += 1;
        }}
      >
        Increment
      </button>
    </div>
  );
}
```

The value of `onClick` here is a function that is called when the button is clicked. It uses a syntax called arrow functions which are not unique to React. They are just a shorter way of writing a function. The `onClick` function increments the `count` variable by 1. However, this does not work. This is because we have to always remember that `Counter` is a function, that returns what the component should look like. When the component is rendered, the `count` variable is set to 0. When we press the button, the variable increments by one. However, React has no way of knowing that the variable has changed, so it does not re-render the component. Even if it did re-render the component, it would call the function again, and count would be reset to zero.

The solution to this are hooks. Hooks to add 'powerups' to your component. Different hooks give different new abilities, but the hook we are interested in is the `useState` hook. This hook allows us to store a piece of state, a value that changes over time, in our component. Let's rewrite our `Counter` component to use the `useState` hook.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <p className="counter-value">{count}</p>
      <button
        className="counter-button"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
}
```

First, we import the useState hook from React. Since, ultimately, a hook is just a function, we call the `useState` function with the initial value of our state, in this case the starting value of the counter. This function returns an array with two elements. The first element is the value of our state, and the second element is a function that we can use to update this state. The special syntax we are using is called array destructuring, and is not specific to React. All it means is that we are assigning the first element of the array to the `count` variable, and the second element to the `setCount` variable. Notice that we are using `const` here. What that means is that, from the start of the function to our return statement, the `count` state will stay the same.

Let's walk through how `useState` works. When we load our app, React calls the renders the `Counter` component by calling our `Counter` function. Next, we call the `useState`. React detects this call. Since it is the first time React calls this component, it creates a new piece of state with the value we passed in. It then returns the value of the state (in this case 0), and a function that we can use to update the state. Then the rest of our code executes, returning a piece of JSX.
React then renders this component to the screen and adds the necessary event listeners.

Now when we click the button, React calls the function we passed to `onClick`. This function in turn, calls the `setCount` function. React detects this call, and updates the state. Then, React re-renders the component, and calls the `Counter` function again. This time, when we call `useState`, React detects that it has already created a piece of state for this component, and returns the new state, along with the same `setCount` function, and the rest happens again as well.

Since the state is managed by React through the `useState` hook, we avoid the issue we had before, and we end up with a working counter.

Also note that state is individual to the component. If we had two counters, they would each have their own state, and would not affect each other.

This video explained the core concepts behind React. In React, we write components, which are functions that return a piece of JSX. We can pass data to these components through props. We can use `{}` brackets to embed JavaScript expressions in our JSX to make it change based on props or other values. We can use hooks to add different abilities to our components. This includes adding state through the `useState` hook. We can use the `useState` hook to store a piece of state in our component, and a function to update this state. When we update the state, React re-renders the component, and calls the function again.
