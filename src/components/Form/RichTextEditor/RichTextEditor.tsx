import { Link, RichTextEditor as BaseRichTextEditor } from "@mantine/tiptap";
import { trans } from "@mongez/localization";
import { FormInputProps, HiddenInput, useFormInput } from "@mongez/react-form";
import { requiredRule } from "@mongez/validator";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorOptions, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import { uploadFiles, uploadsHandler } from "../../../services/upload-service";
import { currentDirection } from "../../../utils/helpers";
import { parseError } from "../../../utils/parse-error";
import { toastError, toastLoading } from "../../Toast";
import { InputWrapper } from "../InputWrapper";
import "./RichTextEditor.scss";

type RichTextEditorInputProps = FormInputProps &
  Partial<EditorOptions> & {
    description?: React.ReactNode;
    height?: React.CSSProperties["height"];
    hint?: React.ReactNode;
  };

const emptyValue = "<p></p>";

function _RichTextEditor(
  {
    description,
    height = 300,
    hint,
    dir = currentDirection(),
    ...props
  }: RichTextEditorInputProps,
  ref: any
) {
  const {
    required,
    autofocus = false,
    value,
    onChange,
    error,
    otherProps,
    label,
    disabled,
    name,
    placeholder,
    formInput,
    id,
    visibleElementRef,
  } = useFormInput(props);

  const changeValue = (value: string) => {
    onChange({
      target: {
        value: value,
      },
    });
  };

  const editor = useEditor({
    content: value,
    onUpdate: ({ editor }) => {
      let value = editor.getHTML();

      if (value === emptyValue) {
        value = "";
      }

      if (dir === "rtl") {
        value = `<p dir="rtl">${value}</p>`;
      }

      changeValue(value);
    },
    autofocus: autofocus,
    editable: !disabled,
    extensions: [
      Placeholder.configure({
        placeholder: placeholder as string,
      }),
      StarterKit,
      Underline,
      Link,
      Color,
      TextStyle,
      Youtube,
      TextAlign.configure({ types: ["heading", "paragraph", "list"] }),
      Image.configure({
        inline: true,
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    ...otherProps,
  });

  useEffect(() => {
    if (!editor) return;

    const onReset = formInput.on("reset", () => {
      editor.commands.setContent(emptyValue);
    });

    return () => onReset.unsubscribe();
  }, [editor, formInput]);

  if (!editor) return null;

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const files: File[] = e.dataTransfer.files;

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toastError(trans("invalidImageFile"));
        continue;
      }

      upload([file]);
    }
  };

  const upload = (files: File[]) => {
    const loading = toastLoading(trans("loading"), trans("uploading"));

    const formData = new FormData();

    for (const file of files) {
      formData.append("uploads[]", file);
    }

    uploadFiles(formData)
      .then((response) => {
        const files: any[] = uploadsHandler.resolveResponse(response);

        editor.view.focus();

        editor.commands.insertContent(`<img src="${files[0].url}" /> <br />`);

        loading.success(trans("success"), trans("filesUploaded"));
      })
      .catch((error) => {
        loading.error(trans("error"), parseError(error));
      });
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <InputWrapper
        visibleElementRef={visibleElementRef}
        error={error}
        dir={dir}
        id={id}
        hint={hint}
        label={label}
        className="richTextEditorRoot"
        labelProps={{
          onClick: () => {
            editor.view.focus();
          },
        }}
        description={description}
        required={required}
      >
        <HiddenInput name={name} value={value} />
        <BaseRichTextEditor
          editor={editor}
          itemRef={ref}
          styles={() => ({
            typographyStylesProvider: {
              height,
              overflowY: "auto",
            },
          })}
        >
          <BaseRichTextEditor.Toolbar sticky stickyOffset={60}>
            <BaseRichTextEditor.ControlsGroup>
              <BaseRichTextEditor.Bold />
              <BaseRichTextEditor.Italic />
              <BaseRichTextEditor.Underline />
              <BaseRichTextEditor.Strikethrough />
              <BaseRichTextEditor.Highlight />
              <BaseRichTextEditor.Code />
              <BaseRichTextEditor.ClearFormatting />
            </BaseRichTextEditor.ControlsGroup>

            <BaseRichTextEditor.ControlsGroup>
              <BaseRichTextEditor.H1 />
              <BaseRichTextEditor.H2 />
              <BaseRichTextEditor.H3 />
              <BaseRichTextEditor.H4 />
              <BaseRichTextEditor.H5 />
              <BaseRichTextEditor.H6 />
            </BaseRichTextEditor.ControlsGroup>
            <BaseRichTextEditor.ControlsGroup>
              <BaseRichTextEditor.ColorPicker
                colors={[
                  "#25262b",
                  "#868e96",
                  "#fa5252",
                  "#e64980",
                  "#be4bdb",
                  "#7950f2",
                  "#4c6ef5",
                  "#228be6",
                  "#15aabf",
                  "#12b886",
                  "#40c057",
                  "#82c91e",
                  "#fab005",
                  "#fd7e14",
                ]}
              />
            </BaseRichTextEditor.ControlsGroup>

            <BaseRichTextEditor.ControlsGroup>
              <BaseRichTextEditor.Color color="#F03E3E" />
              <BaseRichTextEditor.Color color="#7048E8" />
              <BaseRichTextEditor.Color color="#1098AD" />
              <BaseRichTextEditor.Color color="#37B24D" />
              <BaseRichTextEditor.Color color="#F59F00" />
            </BaseRichTextEditor.ControlsGroup>

            <BaseRichTextEditor.ControlsGroup>
              <BaseRichTextEditor.UnsetColor />
            </BaseRichTextEditor.ControlsGroup>

            <BaseRichTextEditor.ControlsGroup>
              <BaseRichTextEditor.AlignLeft />
              <BaseRichTextEditor.AlignCenter />
              <BaseRichTextEditor.AlignJustify />
              <BaseRichTextEditor.AlignRight />
            </BaseRichTextEditor.ControlsGroup>

            <BaseRichTextEditor.ControlsGroup>
              <BaseRichTextEditor.Blockquote />
              <BaseRichTextEditor.Hr />
              <BaseRichTextEditor.BulletList />
              <BaseRichTextEditor.OrderedList />
              <BaseRichTextEditor.Subscript />
              <BaseRichTextEditor.Superscript />
            </BaseRichTextEditor.ControlsGroup>

            <BaseRichTextEditor.ControlsGroup>
              <BaseRichTextEditor.Link />
              <BaseRichTextEditor.Unlink />
            </BaseRichTextEditor.ControlsGroup>

            <BaseRichTextEditor.ControlsGroup>
              <BaseRichTextEditor.AlignLeft />
              <BaseRichTextEditor.AlignCenter />
              <BaseRichTextEditor.AlignJustify />
              <BaseRichTextEditor.AlignRight />
            </BaseRichTextEditor.ControlsGroup>
          </BaseRichTextEditor.Toolbar>

          <BaseRichTextEditor.Content />
        </BaseRichTextEditor>
      </InputWrapper>
    </div>
  );
}

export const RichTextEditor: React.FC<RichTextEditorInputProps> =
  React.forwardRef(_RichTextEditor);

RichTextEditor.defaultProps = {
  rules: [requiredRule],
};
