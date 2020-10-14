import React, { useState } from "react";
import {
  Card,
  colors,
  DivFlex,
  TextareaElement,
} from "@the-ksquare-group/zanma-react-components";

interface INoteComponentProps {
  id?: string;
  name?: string;
  placeholder?: string;
}

export const NoteComponent: React.FC<INoteComponentProps> = ({
  id = "noteComponent",
  name = "noteField",
  placeholder = "Insert text here",
}) => {
  const [noteText, updateNoteText] = useState("");

  const handleChangeTextarea = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNoteText(value);
  };

  return (
    <Card
      css={`
        background-color: ${colors.YELLOW_200};
      `}
    >
      <DivFlex>
        <TextareaElement
          css={`
            border: 1px solid transparent;
            &::placeholder {
              color: ${colors.GRAY_300};
            }
            &:active,
            &:focus {
              border-color: ${colors.GRAY_200};
            }
          `}
          id={id}
          name={name}
          placeholder={placeholder}
          value={noteText}
          onChange={handleChangeTextarea}
        />
      </DivFlex>
    </Card>
  );
};
