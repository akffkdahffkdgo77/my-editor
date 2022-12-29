# My Editor

<img width="1449" alt="스크린샷 2022-12-04 오후 5 13 52" src="https://user-images.githubusercontent.com/52883505/205481626-0b11cb91-7a54-4c3a-a81b-87b719cbf933.png">

## Weekly Clone Coding

Part 7 of [Weekly Clone Coding Challenge](https://github.com/namiein/weekly-clone-coding)

## Project Description

Clone Coding Rich Text Editor.

## v1.0.0 (2022.11.21 ~ 2022.12.04)

-   Custom Formatting

    -   Bold, Italic, Underline, Strike out, Text Align
    -   Code Block

-   Custom Block

    -   Heading (1, 2, 3, 4)
    -   Block Quote
    -   Numbered, Bulleted List (ol, ul)
    -   Checklist
    -   Image
    -   Emoji

## v.1.0.1 (TO-BE)

-   Custom Block

    -   Embed
    -   Paste HTML

## Folder Structure

```
.
├── app
│   └── App.js
├── components
│   ├── Buttons
│   │   ├── BlockButton
│   │   │   └── index.js
│   │   ├── ChecklistButton
│   │   │   └── index.js
│   │   ├── EmojiButton
│   │   │   └── index.js
│   │   ├── ImageButton
│   │   │   └── index.js
│   │   ├── LinkButton
│   │   │   └── index.js
│   │   ├── MarkButton
│   │   │   └── index.js
│   │   └── index.js
│   ├── CheckListItem
│   │   └── index.js
│   ├── Image
│   │   └── index.js
│   ├── Link
│   │   └── index.js
│   └── Toolbar
│       └── index.js
├── index.js
├── pages
│   └── Home
│       ├── components
│       │   ├── Editor
│       │   │   └── index.js
│       │   └── Viewer
│       │       └── index.js
│       └── index.js
├── plugins
│   ├── checklist.js
│   ├── image.js
│   ├── index.js
│   └── inline.js
├── styles
│   └── index.css
└── utils
    ├── constants.js
    ├── deserialize.js
    ├── element.js
    ├── index.js
    ├── leaf.js
    └── serialize.js
```

## NPM Packages

-   React v18
-   react-router-dom
-   tailwindcss
-   Emoji

    -   emoji-mart
    -   @emoji-mart/data
    -   @emoji-mart/react

-   Icon

    -   @fortawesome/fontawesome-svg-core
    -   @fortawesome/free-regular-svg-icons
    -   @fortawesome/free-solid-svg-icons
    -   @fortawesome/react-fontawesome

-   slate

    -   slate
    -   slate-history
    -   slate-hyperscript
    -   slate-react

-   utils
    -   escape-html
    -   is-hotkey
    -   is-url

## Code Convention

-   ESLint - AirBnB
-   Prettier

## References

-   Slate Custom Element

    -   https://docs.slatejs.org/walkthroughs/03-defining-custom-elements

-   Slate Custom Formatting

    -   https://docs.slatejs.org/walkthroughs/04-applying-custom-formatting

-   Slate Examples

    -   https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx
    -   https://github.com/ianstormtaylor/slate/blob/main/site/examples/read-only.tsx
    -   https://github.com/ianstormtaylor/slate/blob/main/site/examples/images.tsx
    -   https://github.com/ianstormtaylor/slate/blob/main/site/examples/inlines.tsx

    -   https://github.com/ianstormtaylor/slate/blob/main/site/examples/check-lists.tsx
    -   https://github.com/ianstormtaylor/slate/blob/main/site/examples/embeds.tsx
    -   https://github.com/ianstormtaylor/slate/blob/main/site/examples/iframe.tsx
    -   https://github.com/ianstormtaylor/slate/blob/main/site/examples/hovering-toolbar.tsx
    -   https://github.com/ianstormtaylor/slate/blob/main/site/examples/paste-html.tsx

-   Slate serializing, deserializing
    -   https://docs.slatejs.org/concepts/10-serializing#deserializing
