// import React, { useEffect, useRef, useState } from "react";
import React, { useEffect, useState } from "react";
import {
  AddCircleOutlineIcon,
  colors,
  Column,
  DivFlex,
  DivGeneral,
  H2,
  H3,
  H4,
  mediaQueries,
  Row,
  SvgSizes,
  TertiaryButton,
  withParentColumns,
  Wrapper,
} from "@the-ksquare-group/zanma-react-components";
import { NoteComponent } from "../molecules/NoteComponent";
import { notesList, newNoteData } from "../atoms/DummyData";
import { IPostList } from "../entities/PostList";

export const HomeScreen: React.FC = () => {
  const [newNote, updateNewNote] = useState(notesList);
  const [posts, updatePosts] = useState<IPostList[]>([]);
  // const isComponentUnmounted = useRef(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postListData = await fetch("/posts").then((res) => res.json());
        // if (!isComponentUnmounted.current) {
        updatePosts(postListData);
        // }
      } catch (err) {
        // if (!isComponentUnmounted.current) {
        console.log({ err: "error" });
        // }
      }
    };

    fetchPosts();
  }, []);

  console.log(posts);

  const handleClickAddNote = () => {
    updateNewNote([...newNote, newNoteData]);
  };

  const noteContentLgWidth = withParentColumns(12);
  const noteContentMdWidth = withParentColumns(8);
  const noteContentSmWidth = withParentColumns(4);

  return (
    <Wrapper className="homeScreen-wrapper" css="width: auto;">
      <Row className="header-row">
        <Column
          className="header-column"
          lg={noteContentLgWidth(12)}
          md={noteContentMdWidth(8)}
          sm={noteContentSmWidth(4)}
        >
          <DivGeneral padding="32px 0 48px">
            <DivFlex alignContent="center" paddingBottom="24px">
              <H2 color={colors.GRAY_500}>Sticky Notes App</H2>
            </DivFlex>
            <DivFlex alignContent="center" paddingBottom="24px">
              <H3 color={colors.GRAY_300}>Welcome User!</H3>
            </DivFlex>
            <DivFlex alignContent="center" paddingBottom="24px">
              <H4 color={colors.GRAY_200} css="text-transform: none;">
                To start writing and organizing your life click on the note
                below.
              </H4>
            </DivFlex>
          </DivGeneral>
        </Column>
      </Row>

      <Row className="body-row">
        <DivFlex
          css={`
            flex: 1;
            flex-direction: column;
            @media (min-width: ${mediaQueries.SMALL_TABLET_MIN_WIDTH}) {
              flex-direction: row;
            }
          `}
        >
          <Column
            className="leftSide-column"
            css={`
              border-bottom: 1px solid ${colors.GRAY_200};
              padding: 16px 0;
              @media (min-width: ${mediaQueries.SMALL_TABLET_MIN_WIDTH}) {
                border-bottom: none;
                border-right: 1px solid ${colors.GRAY_200};
              }
            `}
            justifyContent="center"
            lg={noteContentLgWidth(1)}
            md={noteContentMdWidth(1)}
            sm={noteContentSmWidth(4)}
          >
            <TertiaryButton onClick={handleClickAddNote}>
              <DivFlex justifyContent="center">
                <AddCircleOutlineIcon
                  fill={colors.BLUE_200}
                  size={SvgSizes.LG}
                  title="Add note"
                />
              </DivFlex>
            </TertiaryButton>
          </Column>
          <Column
            className="rightSide-column"
            css="padding: 8px 0;"
            lg={noteContentLgWidth(11)}
            md={noteContentMdWidth(7)}
            sm={noteContentSmWidth(4)}
          >
            <Row
              className="cards-row"
              css={`
                margin: 0;
                @media (min-width: ${mediaQueries.SMALL_TABLET_MIN_WIDTH}) {
                  margin-left: -8px;
                  margin-right: -8px;
                }
              `}
            >
              {posts.map((post, index) => (
                <Column
                  className="card-column"
                  css="padding: 8px 0;"
                  key={`noteColumn-${index}`}
                  lg={noteContentLgWidth(3.5)}
                  md={noteContentMdWidth(3.5)}
                  sm={noteContentSmWidth(4)}
                >
                  <NoteComponent
                    id={`noteId-${index}`}
                    key={`noteKey-${index}`}
                    name={`noteName-${post.title}`}
                    value={post.description}
                  />
                </Column>
              ))}
            </Row>
          </Column>
        </DivFlex>
      </Row>
    </Wrapper>
  );
};
