import React, { useEffect, useState } from "react";
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
  value: string;
}

export const NoteComponent: React.FC<INoteComponentProps> = ({
  id = "noteComponent",
  name = "noteField",
  placeholder = "Insert text here",
  value,
}) => {
  const [noteDescription, updateNoteDescription] = useState(value);
  // const [actualValue] = useState(value);
  const AUTOSAVE_INTERVAL = 3000;

  const handleChangeTextarea = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNoteDescription(value);
  };

  useEffect(() => {
    const handleUpdateNote = async (noteText: string) => {
      try {
        const post = {
          title: "",
          description: noteText,
        };
        await fetch(`/posts/${id}`, {
          method: "PUT",
          body: JSON.stringify(post),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
      } catch (err) {
        console.log({ err: "error" });
      }
    };

    const timer = setTimeout(() => {
      if (noteDescription !== value) {
        handleUpdateNote(noteDescription);
        updateNoteDescription(noteDescription);
      }
    }, AUTOSAVE_INTERVAL);
    return () => clearTimeout(timer);
  }, [id, noteDescription, value]);

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
          value={noteDescription}
          onChange={handleChangeTextarea}
        />
      </DivFlex>
    </Card>
  );
};
