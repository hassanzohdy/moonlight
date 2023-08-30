import { ActionIcon, Flex } from "@mantine/core";
import { trans } from "@mongez/localization";
import { IconList, IconTrash } from "@tabler/icons-react";
import { SortableItem, SortableList } from "@thaddeusjiang/react-sortable-list";
import { Tooltip } from "../../Tooltip";
import { File } from "./File";
import { useDropzoneManager, useUploadedFiles } from "./hooks";

const DragHandler = props => (
  <Flex
    style={{
      display: "inline-flex",
    }}
    {...props}>
    <IconList
      color="gray"
      style={{
        cursor: "grab",
        marginTop: "0.5rem",
      }}
    />
  </Flex>
);

export function UploadedFilesList() {
  const dropzoneManager = useDropzoneManager();
  const filesList = useUploadedFiles();

  return (
    <SortableList
      items={filesList as any[]}
      setItems={(stateUpdater: any) => {
        dropzoneManager.setFilesList(stateUpdater(dropzoneManager.filesList));
      }}>
      {({ items }: any) =>
        items.map(file => {
          return (
            <SortableItem DragHandler={DragHandler} key={file.id} id={file.id}>
              <Flex
                style={{
                  display: "inline-flex",
                  width: "calc(100% - 50px)",
                }}
                justify="flex-start">
                <span
                  style={{
                    flexGrow: 1,
                  }}>
                  <File
                    url={file.url}
                    key={file.id}
                    size={file.size}
                    name={file.name}
                    rightIcon={
                      <Tooltip label={trans("moonlight.remove")}>
                        <ActionIcon
                          onClick={dropzoneManager.removeFile.bind(
                            dropzoneManager,
                            file,
                          )}>
                          <IconTrash />
                        </ActionIcon>
                      </Tooltip>
                    }
                  />
                </span>
              </Flex>
            </SortableItem>
          );
        })
      }
    </SortableList>
  );
}
