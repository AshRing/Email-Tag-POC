# Email Tag POC

Proof of Concept for adding multiple emails as editable tags.
(DEMO)[https://ashring.github.io/Email-Tag-POC/]

## Considerations

- Email is added as a tag/chip after `comma` or `space` keystroke.
- Email is validated when it is added to determine if it is a valid email and isn't a duplicate. A red border will mark invalid email tags.
- Each email is removable.
- Each email is editable. Edit an email by clicking the text on the chip and hitting `enter` after finished editing (also consider clicking outside to finish or other options)
- Error messages have not been added with this POC
- Emails tags need some sort of ID
- Tag would be a good candidate for a common component

## Run

1. `npm install`
2. `npm start`
