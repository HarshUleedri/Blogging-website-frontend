import { useRef, useState } from "react";
// import TextEditor from "../components/Common/TextEditor/TextEditor";
import { useMutation } from "@tanstack/react-query";
import { uploadImageInApi } from "../api/uploadImageApi/uploadImageApi";

const useTextEditor = () => {
  const [isHeadingOpen, setIsHeadingOpen] = useState(false);
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const { isPending, mutate } = useMutation({
    mutationFn: (data) => uploadImageInApi(data),
    onSuccess: (res) => {
   
      const textarea = textareaRef.current;

      if (!textarea) return;
      const { selectionStart: start } = textarea;

      const currentPositon = start;

      let url = res.url;

      let newText;

      if (!currentPositon) {
        newText = text + `\n ![Image description](${url}) \n`;
      } else {
        newText =
          text.slice(0, currentPositon) +
          `\n ![Image description](${url}) \n` +
          text.slice(currentPositon);
      }

      setText(newText);
    },
  });

  const applyFormat = (before, after = "", isBlock = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart: start, selectionEnd: end } = textarea;
    const selectedText = text.slice(start, end);
    const beforeLength = before.length;
    const afterLength = after.length;

    let newText;
    let newStart = start;
    let newEnd = end;

    if (isBlock) {
      const lines = text.split("\n");
      const currentLineIndex = text.substring(0, start).split("\n").length - 1;
      const currentLine = lines[currentLineIndex];

      // If the line already starts with the format, remove it
      if (currentLine.trim().startsWith(before.trim())) {
        lines[currentLineIndex] = currentLine.replace(before, "");
      } else {
        lines[currentLineIndex] = before + currentLine;
      }

      newText = lines.join("\n");
    } else {
      // Check if already wrapped
      const isWrapped =
        text.slice(start - beforeLength, start) === before &&
        text.slice(end, end + afterLength) === after;

      if (isWrapped) {
        newText =
          text.slice(0, start - beforeLength) +
          selectedText +
          text.slice(end + afterLength);
        newStart = start - beforeLength;
        newEnd = end - beforeLength;
      } else {
        newText =
          text.slice(0, start) +
          before +
          selectedText +
          after +
          text.slice(end);
        newStart = start + beforeLength;
        newEnd = end + beforeLength;
      }
    }

    setText(newText);

    requestAnimationFrame(() => {
      textarea.selectionStart = newStart;
      textarea.selectionEnd = newEnd;
      textarea.focus();
    });
  };
  const addImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    mutate(formData);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const { selectionStart: start } = textarea;
      const textBeforeCursor = text.substring(0, start);
      const textAfterCursor = text.substring(start);
      const lastLine = textBeforeCursor.split("\n").pop();

      // Match ordered list (1., 2., etc.)
      const orderedMatch = lastLine.match(/^(\d+)\.\s.*/);
      // Match unordered list (- text or * text)
      const unorderedMatch = lastLine.match(/^([-*])\s.*/);

      if (orderedMatch) {
        // Handle ordered list (1., 2., etc.)
        e.preventDefault();
        const number = parseInt(orderedMatch[1], 10) + 1;
        const newText = `${textBeforeCursor}\n${number}. ${textAfterCursor}`;
        setText(newText);

        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd =
            start + number.toString().length + 3;
        });
      } else if (unorderedMatch) {
        // Handle unordered list (- text or * text)
        e.preventDefault();
        const symbol = unorderedMatch[1]; // Either "-" or "*"
        const newText = `${textBeforeCursor}\n${symbol} ${textAfterCursor}`;
        setText(newText);

        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 3;
        });
      } else if (lastLine.match(/^[-*]\s?$/)) {
        // If the user presses Enter on an empty unordered list item, remove it
        e.preventDefault();
        const newText =
          textBeforeCursor.replace(/\n[-*]\s?$/, "") + textAfterCursor;
        setText(newText);

        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start - 3;
        });
      }
    }
  };

  const data = {
    isHeadingOpen,
    setIsHeadingOpen,
    applyFormat,
    isPending,
    addImage,
  };

  return { text, setText, handleKeyDown, textareaRef, data };
};

export default useTextEditor;

//  ----

// const applyFormat = (before, after) => {
//   const textarea = textaresRef.current;

//   if (!textarea) return;

//   const { selectionStart: start, selectionEnd: end } = textarea;

//   const beforeLength = before.length;
//   const afterLength = after.length;

//   const selectedText = text.slice(start, end);

//   const isWrapped =
//     text.slice(start - beforeLength, start) === before &&
//     text.slice(end, end + afterLength) === after;

//   let newText;

//   if (!isWrapped) {
//     newText =
//       text.slice(0, start) + before + selectedText + after + text.slice(end);
//     requestAnimationFrame(() => {
//       textarea.selectionStart = start + beforeLength;
//       textarea.selectionEnd = end + afterLength;
//       textarea.focus();
//     });
//   } else {
//     newText =
//       text.slice(0, start - beforeLength) +
//       selectedText +
//       text.slice(end + afterLength);
//     requestAnimationFrame(() => {
//       textarea.selectionStart = start - beforeLength;
//       textarea.selectionEnd = end - afterLength;
//       textarea.focus();
//     });
//   }

//   setText(newText);

//   // requestAnimationFrame(() => {
//   //   textarea.selectionStart = start + before.length;
//   //   textarea.selectionEnd = end + before.length;
//   //   textarea.focus();
//   // });
// };

// const applyFormat = (before, after = "", isBlock = false) => {
//   const textarea = textareaRef.current;
//   if (!textarea) return;

//   const { selectionStart: start, selectionEnd: end } = textarea;
//   const selectedText = text.slice(start, end);
//   const beforeLength = before.length;
//   const afterLength = after.length;

//   let newText;
//   let newStart = start;
//   let newEnd = end;

//   if (isBlock) {
//     const lines = text.split("\n");
//     const currentLineIndex = text.substring(0, start).split("\n").length - 1;
//     const currentLine = lines[currentLineIndex];

//     // If the line already starts with the format, remove it
//     if (currentLine.trim().startsWith(before.trim())) {
//       lines[currentLineIndex] = currentLine.replace(before, "");
//     } else {
//       lines[currentLineIndex] = before + currentLine;
//     }

//     newText = lines.join("\n");
//   } else {
//     // Check if already wrapped
//     const isWrapped =
//       text.slice(start - beforeLength, start) === before &&
//       text.slice(end, end + afterLength) === after;

//     if (isWrapped) {
//       newText =
//         text.slice(0, start - beforeLength) +
//         selectedText +
//         text.slice(end + afterLength);
//       newStart = start - beforeLength;
//       newEnd = end - beforeLength;
//     } else {
//       newText =
//         text.slice(0, start) +
//         before +
//         selectedText +
//         after +
//         text.slice(end);
//       newStart = start + beforeLength;
//       newEnd = end + beforeLength;
//     }
//   }

//   setText(newText);

//   requestAnimationFrame(() => {
//     textarea.selectionStart = newStart;
//     textarea.selectionEnd = newEnd;
//     textarea.focus();
//   });
// };

// const handleKeyDown = (e) => {
//   if (e.key === "Enter") {
//     const textarea = textareaRef.current;
//     if (!textarea) return;

//     const { selectionStart: start } = textarea;
//     const textBeforeCursor = text.substring(0, start);
//     const textAfterCursor = text.substring(start);
//     const lastLine = textBeforeCursor.split("\n").pop();

//     // Match ordered list (1., 2., etc.)
//     const orderedMatch = lastLine.match(/^(\d+)\.\s.*/);
//     // Match unordered list (- text or * text)
//     const unorderedMatch = lastLine.match(/^([-*])\s.*/);

//     if (orderedMatch) {
//       // Handle ordered list (1., 2., etc.)
//       e.preventDefault();
//       const number = parseInt(orderedMatch[1], 10) + 1;
//       const newText = `${textBeforeCursor}\n${number}. ${textAfterCursor}`;
//       setText(newText);

//       requestAnimationFrame(() => {
//         textarea.selectionStart = textarea.selectionEnd =
//           start + number.toString().length + 3;
//       });
//     } else if (unorderedMatch) {
//       // Handle unordered list (- text or * text)
//       e.preventDefault();
//       const symbol = unorderedMatch[1]; // Either "-" or "*"
//       const newText = `${textBeforeCursor}\n${symbol} ${textAfterCursor}`;
//       setText(newText);

//       requestAnimationFrame(() => {
//         textarea.selectionStart = textarea.selectionEnd = start + 3;
//       });
//     } else if (lastLine.match(/^[-*]\s?$/)) {
//       // If the user presses Enter on an empty unordered list item, remove it
//       e.preventDefault();
//       const newText =
//         textBeforeCursor.replace(/\n[-*]\s?$/, "") + textAfterCursor;
//       setText(newText);

//       requestAnimationFrame(() => {
//         textarea.selectionStart = textarea.selectionEnd = start - 3;
//       });
//     }
//   }
// };
