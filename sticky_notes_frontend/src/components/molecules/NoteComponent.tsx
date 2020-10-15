import React, { useEffect, useState } from "react";
import {
  Card,
  ClickableElement,
  CloseIcon,
  colors,
  DivFlex,
  TextareaElement,
  utils,
} from "@the-ksquare-group/zanma-react-components";

interface INoteComponentProps {
  id?: string;
  name?: string;
  descriptionPlaceholder?: string;
  titlePlaceholder?: string;
  descriptionValue: string;
  titleValue: string;
}

export const NoteComponent: React.FC<INoteComponentProps> = ({
  id = "noteComponent",
  name = "noteField",
  descriptionPlaceholder = "Insert text here",
  titlePlaceholder = "Write a title",
  descriptionValue,
  titleValue,
}) => {
  const [noteTitle, updateNoteTitle] = useState(titleValue);
  const [noteDescription, updateNoteDescription] = useState(descriptionValue);
  const [hasNoteChanged, updateHasNoteChanged] = useState(false);
  const AUTOSAVE_INTERVAL = 3000;

  const handleChangeTitle = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNoteTitle(value);
    updateHasNoteChanged(true);
  };

  const handleChangeDescription = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNoteDescription(value);
    updateHasNoteChanged(true);
  };

  useEffect(() => {
    const handleUpdateNote = async (
      noteTextDescription: string,
      noteTextTitle: string
    ) => {
      try {
        const post = {
          title: noteTextTitle,
          description: noteTextDescription,
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
      if (
        (noteDescription !== descriptionValue && hasNoteChanged) ||
        (noteTitle !== titleValue && hasNoteChanged)
      ) {
        handleUpdateNote(noteDescription, noteTitle);
        updateNoteTitle(noteTitle);
        updateNoteDescription(noteDescription);
        updateHasNoteChanged(false);
      }
    }, AUTOSAVE_INTERVAL);
    return () => clearTimeout(timer);
  }, [
    hasNoteChanged,
    id,
    noteDescription,
    descriptionValue,
    noteTitle,
    titleValue,
  ]);

  const handleDeletedNote = () => {
    const deleteNote = async () => {
      try {
        await fetch(`/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
        window.location.reload();
      } catch (err) {
        console.log({ err: "error" });
      }
    };

    deleteNote();
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
            background-color: ${utils.addColorTransparency(
              colors.GRAY_200,
              75
            )};
            border: 1px solid transparent;
            border-radius: 4px 0 0 0;
            box-shadow: 0 3px 6px
              ${utils.addColorTransparency(colors.BLACK, 16)};
            font-weight: 700;
            height: 25px;
            &::placeholder {
              color: ${colors.GRAY_300};
            }
            &:active,
            &:focus {
              border-color: transparent;
              box-shadow: 0 3px 6px
                ${utils.addColorTransparency(colors.BLACK, 30)};
            }
          `}
          id={id}
          name={`noteTitle-${name}`}
          placeholder={titlePlaceholder}
          value={noteTitle}
          onChange={handleChangeTitle}
        />
        <ClickableElement
          css={`
            align-items: center;
            background-color: ${utils.addColorTransparency(colors.RED_200, 75)};
            border: 1px solid transparent;
            border-radius: 0 4px 0 0;
            box-shadow: 0 3px 6px
              ${utils.addColorTransparency(colors.BLACK, 16)};
            display: flex;
            justify-content: center;
            width: 60px;
            &:active,
            &:focus {
              border-color: transparent;
              box-shadow: 0 3px 6px
                ${utils.addColorTransparency(colors.BLACK, 30)};
              outline: transparent;
            }
          `}
          title="Delete note"
          onClick={handleDeletedNote}
        >
          <CloseIcon fill={colors.GRAY_500} />
        </ClickableElement>
      </DivFlex>

      <DivFlex>
        <TextareaElement
          css={`
            border: 1px solid transparent;
            border-radius: 0 0 4px 4px;
            box-shadow: 0 3px 6px
              ${utils.addColorTransparency(colors.BLACK, 16)};
            &::placeholder {
              color: ${colors.GRAY_300};
            }
            &:active,
            &:focus {
              border-color: transparent;
              box-shadow: 0 3px 6px
                ${utils.addColorTransparency(colors.BLACK, 30)};
            }
          `}
          id={id}
          name={`noteDescription-${name}`}
          placeholder={descriptionPlaceholder}
          value={noteDescription}
          onChange={handleChangeDescription}
        />
      </DivFlex>
    </Card>
  );
};
