# react-magic-input

`react-magic-input` is a collection of customizable and easy-to-use form components for React applications. It provides a variety of input types to simplify form handling, along with built-in validation support.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Components](#components)
    -   [Form](#form)
    -   [Input](#input)
    -   [EmailInput](#emailinput)
    -   [PasswordInput](#passwordinput)
    -   [PasswordSetter](#passwordsetter)
    -   [RadioButton](#radiobutton)
    -   [CheckBoxGroup](#checkboxgroup)
    -   [NumberInput](#numberinput)
    -   [SliderInput](#sliderinput)
    -   [TextInput](#textinput)
    -   [SelectInput](#selectinput)
    -   [FileInput](#fileinput)
    -   [Button](#button)

## Installation

You can install `react-magic-input` via npm:

```bash
npm install react-magic-input
```

## **Usage**

Here’s an example of how to use the components in a form:

```jsx
import React from "react";
import {
    Form,
    Input,
    RadioButton,
    PasswordSetter,
    PasswordInput,
    CheckBoxGroup,
    EmailInput,
    NumberInput,
    SliderInput,
    TextInput,
    SelectInput,
    FileInput,
    Button,
} from "react-magic-input";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const App = () => {
    const handleSubmit = (data) => {
        console.log("Form submitted:", data);
    };

    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    return (
        <Form
            onSubmit={handleSubmit}
            className="flex flex-col w-3/5 mx-auto shadow-xl "
        >
            <Input label="Email" name="email" required pattern={emailPattern} />
            <RadioButton
                label="Gender"
                name="gender"
                options={["Male", "Female"]}
                required
            />
            <PasswordSetter label="Password" name="password" required />
            <PasswordInput
                label="Login Password"
                name="loginPassword"
                required
            />
            <CheckBoxGroup
                label="Select your preferences"
                name="preferences"
                required
                options={["Option 1", "Option 2", "Option 3"]}
            />
            <EmailInput name="email" required />
            <NumberInput
                label="Age"
                name="age"
                required
                min={0}
                max={120}
                integer={true}
            />
            <SliderInput
                label="Volume"
                name="volume"
                required
                min={0}
                max={100}
                step={1}
            />
            <TextInput
                label="Username"
                name="username"
                required
                minLength={5}
                maxLength={15}
                allowSpecialChars={false}
                allowSpaces={false}
                transformToUppercase={true}
                allowNumbers={false}
            />
            <SelectInput
                label="Choose an option"
                name="selectExample"
                options={options}
                required
            />
            <FileInput
                label="Upload File"
                name="fileUpload"
                acceptedTypes={["image/jpeg", "image/png", "application/pdf"]}
                maxSizeMB={10}
                required
            />
            <Button type="submit" className="w-40 mx-auto">
                Submit
            </Button>
        </Form>
    );
};

export default App;
```

---

## Components

### Form

The `Form` component wraps all input fields and handles form submission.

#### Props

-   **onSubmit**: `(data: Record<string, any>) => void` - Function to handle form submission.
-   **children**: `React.ReactNode` - The child components (inputs).
-   **className?**: `string` - Additional CSS classes for styling.
-   **style?**: `React.CSSProperties` - Inline styles.

### Input

The basic input field component.

#### Props

-   **label**: `string` - Label for the input.
-   **name**: `string` - Name of the input.
-   **type?**: `string` - Input type, default is "text".
-   **placeholder?**: `string` - Placeholder text for the input.
-   **required?**: `boolean` - Indicates if the input is mandatory.
-   **pattern?**: `RegExp` - Validation pattern for the input.
-   **className?**: `string` - Additional CSS classes for styling.
-   **style?**: `React.CSSProperties` - Inline styles.

### EmailInput

An input specifically for email addresses.

#### Props

-   **required?**: `boolean` - Indicates if the input is mandatory.
-   **placeholder?**: `string` - Placeholder text for the input.
-   **className?**: `string` - Additional CSS classes for styling.
-   **label?**: `string` - Label for the input.
-   **name**: `string` - Name of the input.
-   **style?**: `React.CSSProperties` - Inline styles.

### PasswordInput

An input for password fields.

#### Props

-   **label?**: `string` - Label for the input.
-   **name**: `string` - Name of the input.
-   **placeholder?**: `string` - Placeholder text for the input.
-   **required?**: `boolean` - Indicates if the input is mandatory.
-   **minLength?**: `number` - Minimum length of the password.
-   **className?**: `string` - Additional CSS classes for styling.
-   **style?**: `React.CSSProperties` - Inline styles.

### PasswordSetter

A component for setting passwords with confirmation.

#### Props

-   **label**: `string` - Label for the input.
-   **name**: `string` - Name of the input.
-   **required?**: `boolean` - Indicates if the input is mandatory.
-   **className?**: `string` - Additional CSS classes for styling.
-   **style?**: `React.CSSProperties` - Inline styles.

### RadioButton

A group of radio buttons for selecting a single option.

#### Props

-   **label**: `string` - Label for the radio group.
-   **name**: `string` - Name of the radio group.
-   **options**: `string[]` - Array of options for the radio buttons.
-   **required?**: `boolean` - Indicates if the selection is mandatory.
-   **className?**: `string` - Additional CSS classes for styling.
-   **style?**: `React.CSSProperties` - Inline styles.

### CheckBoxGroup

A group of checkboxes for multiple selections.

#### Props

-   **label**: `string` - Label for the checkbox group.
-   **name**: `string` - Name of the checkbox group.
-   **options**: `string[]` - Array of options for the checkboxes.
-   **required?**: `boolean` - Indicates if at least one selection is mandatory.
-   **className?**: `string` - Additional CSS classes for styling.
-   **style?**: `React.CSSProperties` - Inline styles.

### NumberInput

An input for numerical values.

#### Props

-   **label**: `string` - Label for the input.
-   **name**: `string` - Name of the input.
-   **required?**: `boolean` - Indicates if the input is mandatory.
-   **min?**: `number` - Minimum value allowed.
-   **max?**: `number` - Maximum value allowed.
-   **integer?**: `boolean` - Indicates if only integer values are allowed.
-   **className?**: `string` - Additional CSS classes for styling.
-   **style?**: `React.CSSProperties` - Inline styles.

### SliderInput

A slider input for selecting numeric values within a range.

#### Props

-   **label**: `string` - Label for the slider.
-   **name**: `string` - Name of the slider input.
-   **required?**: `boolean` - Indicates if the input is mandatory.
-   **min?**: `number` - Minimum value allowed.
-   **max?**: `number` - Maximum value allowed.
-   **step?**: `number` - Step value for the slider.
-   **className?**: `string` - Additional CSS classes for styling.
-   **style?**: `React.CSSProperties` - Inline styles.

### TextInput

An input for text with additional options.

#### Props

-   **label**: `string` - Label for the input.
-   **name**: `string` - Name of the input.
-   **placeholder?**: `string` - Placeholder text for the input.
-   **required?**: `boolean` - Indicates if the input is mandatory.
-   **minLength?**: `number` - Minimum length of the text.
-   **maxLength?**: `number` - Maximum length of the text.
-   **allowSpecialChars?**: `boolean` - Indicates if special characters are allowed.
-   **allowSpaces?**: `boolean` - Indicates if spaces are allowed.
-   **transformToUppercase?**: `boolean` - Transforms input to uppercase.
-   **allowNumbers?**: `boolean` - Indicates if numbers are allowed.
-   **className?**: `string` - Additional CSS classes for styling.
-   **style?**: `React.CSSProperties` - Inline styles.

### SelectInput

A dropdown select input for choosing options.

#### Props

-   **label**: `string` - Label for the select input.
-   **name**: `string` - Name of the select input.
-   **options**: `{ value: string; label: string; }[]` - Array of options for the select input.
-   **required?**: `boolean` - Indicates if a selection is mandatory.
-   **className?**: `string` - Additional CSS classes for styling.
-   **style?**: `React.CSSProperties` - Inline styles.

### FileInput

An input for file uploads.

#### Props

-   **label**: `string` - Label for the file input.
-   **name**: `string` - Name of the file input.
-   **required?**: `boolean` - Indicates if file upload is mandatory.
-   **acceptedTypes?**: `string[]` - Array of accepted MIME types for the file input.
-   **maxSizeMB?**: `number` - Maximum file size allowed in MB.
-   **className?**: `string` - Additional CSS classes for styling.
-   **style?**: `React.CSSProperties` - Inline styles.

### Button

A button component for form submission.

#### Props

-   **type**: `"button" | "submit"` - Type of the button.
-   **onClick?**: `() => void` - Function to execute on button click.
-   **children**: `React.ReactNode` - Content inside the button.
-   **className?**: `string` - Additional CSS classes for styling.
-   **style?**: `React.CSSProperties` - Inline styles.
