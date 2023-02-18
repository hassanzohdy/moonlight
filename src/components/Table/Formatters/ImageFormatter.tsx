import { Avatar, Modal, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import { Image } from "../../Image";
import { FormatterProps } from "../TableProps";

export function ImageFormatter({
  value,
  row,
  settings,
}: Partial<FormatterProps>) {
  if (settings?.url) {
    value = settings.url(row);
  }

  const image = <Avatar size={30} src={value} radius={30} />;

  const [opened, setOpened] = useState(false);

  if (!value) return image;

  return (
    <>
      <UnstyledButton onClick={() => setOpened(true)}>{image}</UnstyledButton>

      <Modal
        size="xl"
        exitTransitionDuration={400}
        opened={opened}
        onClose={() => setOpened(false)}>
        <Image src={value} alt={value} />
      </Modal>
    </>
  );
}
