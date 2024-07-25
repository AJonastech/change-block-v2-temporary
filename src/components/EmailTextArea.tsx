import React, { useState } from 'react';
import { Textarea, Chip } from '@nextui-org/react';

interface EmailTextareaProps {
  value: string[];
  onChange: (emails: string[]) => void;
}

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const EmailTextarea: React.FC<EmailTextareaProps> = ({ value = [], onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue.includes(',') || newValue.includes(' ')) {
      const newEmails = newValue
        .split(/[, ]+/)
        .filter(Boolean)
        .filter(isValidEmail);
      onChange([...value, ...newEmails]);
      setInputValue('');
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('Text');
    const newEmails = pastedText
      .split(/[, ]+/)
      .filter(Boolean)
      .filter(isValidEmail);
    onChange([...value, ...newEmails]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default action of creating a new line
      const newEmails = inputValue
        .split(/[, ]+/)
        .filter(Boolean)
        .filter(isValidEmail);
      if (newEmails.length) {
        onChange([...value, ...newEmails]);
        setInputValue('');
      }
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    onChange(value.filter(email => email !== emailToRemove));
  };

  return (
    <div>
      <Textarea
        label="Email Addresses"
        placeholder="Type Email Addresses here"
        value={inputValue}
        onChange={handleInputChange}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        variant="bordered"
        classNames={{
          inputWrapper: "border-[1px] border-[#C1C2C0]/50",
        }}
        labelPlacement="outside"
        fullWidth
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((email, index) => (
          <Chip
            key={index}
            size="md"
            color="primary"
            onClose={() => handleRemoveEmail(email)}
          >
            {email}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default EmailTextarea;
