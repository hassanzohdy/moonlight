# Moonlight

Moonlight is a collection of React components and utilities that are used in to rapidly build web applications.

## Installation

`npm i @mongez/moonlight`

OR

`yarn add @mongez/moonlight`

OR

`pnpm install @mongez/moonlight`

## Reactive Form

Reactive Form is a super simple and easy to use form builder that is does the heavy lifting for you, actually, you won't probably write a React code, it depends on builders, which generates proper react code for you based on your configurations.

### Usage

```ts
import { createReactForm, emailInput, passwordInput } from "@mongez/moonlight";

export const LoginForm = createReactForm(reactiveForm => {
    reactiveForm.heading("Login").setInputs([
        emailInput("email").required(),
        passwordInput("password").required(),
    ]).submitButton("Login");
});
```

Output!!

![Reactive Form](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xzk95n8j819k8jtsy0x2.png)
