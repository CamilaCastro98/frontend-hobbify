import emojiRegex from 'emoji-regex'

const validationCreateHobby = ({name,emoji,description}) => {
    const errors = {};
    const emojiRegexPattern = emojiRegex()
    const nameRegex = /^[a-zA-Z0-9 ]*$/


    if (!name) {
      errors.name = "Please enter a name for your hobby"
    } else if (!nameRegex.test(name)) {
        errors.name = "Name should contain only alphanumeric characters"
    }

    if (!emoji) {
        errors.emoji = "Please enter an emoji for your hobby"
      } else if (!emojiRegexPattern.test(emoji)) {
          errors.emoji = "Please enter only emojis"
      }

    return errors;
}

export default validationCreateHobby