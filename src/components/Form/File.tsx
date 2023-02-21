import styled from "@emotion/styled";
import { Avatar, Flex, MantineTheme, Text } from "@mantine/core";
import { Link } from "@mongez/react-router";
import { extension } from "@mongez/reinforcements";
import { IconFile } from "@tabler/icons";
import React from "react";
import { isImageExtension } from "../../utils/extensions";
import { humanSize } from "../../utils/human-size";

const FileText = styled.div`
  label: FileText;
  margin-inline-start: 2px;
  margin-top: 13px;
`;

const FileProgress = styled.span`
  label: FileProgress;
`;

const getExtensionColor = (extension: string, theme: MantineTheme) => {
  switch (extension) {
    case "pdf":
      return theme.colors.red[5];
    // images extensions will return gradient colors
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "svg":
    case "webp":
    case "bmp":
    case "ico":
      return theme.fn.linearGradient(
        45,
        theme.colors.indigo[5],
        theme.colors.cyan[5]
      );
    case "doc":
    case "docx":
    case "php":
      return theme.colors.blue[5];
    case "xls":
    case "xlsx":
      return theme.colors.green[5];
    case "ppt":
    case "pptx":
      return theme.colors.orange[5];
    case "zip":
    case "gz":
    case "rar":
      return theme.colors.violet[5];
    case "txt":
      return theme.colors.gray[5];
    default:
      return theme.colors.gray[5];
  }
};

const FileExtension = styled.span`
  label: FileExtension;
  background: ${({ theme, children }) =>
    getExtensionColor(children as string, theme)};
  color: #fff;
  padding: 0.2rem 0;
  text-align: center;
  font-size: 0.5rem;
  font-weight: bold;
  border-radius: 2px;
  text-transform: uppercase;
  position: absolute;
  width: 25px;
  bottom: 4px;
  left: 9px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const IconWrapper = styled.div`
  label: IconWrapper;
  position: relative;
  margin-top: 0.3rem;
  margin-inline-end: 0.5rem;
`;

const FileLink = styled(Link)`
  label: FileLink;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray[6]};
  &:hover {
    color: ${({ theme }) => theme.colors.blue[5]};
  }
`;

export function File({ name, size, url, rightIcon }: any) {
  const fileSize = humanSize(size);

  const fileExtension = extension(name);

  const Wrapper = url ? FileLink : React.Fragment;

  const wrapperProps = url ? { to: url, newTab: true } : {};

  return (
    <Flex justify={"space-between"} align="center">
      <Wrapper {...wrapperProps}>
        <Flex>
          <IconWrapper>
            {!isImageExtension(fileExtension) && (
              <>
                <IconFile color="gray" size={32} />
                <FileExtension>{fileExtension}</FileExtension>
              </>
            )}
            {isImageExtension(fileExtension) && (
              <>
                <Avatar
                  src={url}
                  alt={name}
                  radius={1000}
                  size="sm"
                  style={{
                    marginTop: "0.2rem",
                  }}
                />
              </>
            )}
          </IconWrapper>
          <Text fz={"xs"} fw={500}>
            <FileText>
              {name} (<FileProgress>{fileSize}</FileProgress>)
            </FileText>
          </Text>
        </Flex>
      </Wrapper>
      <span>{rightIcon}</span>
    </Flex>
  );
}
