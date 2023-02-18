import {
  Avatar,
  AvatarProps,
  Image as BaseImage,
  ImageProps,
} from "@mantine/core";

export function CircleImage(props: AvatarProps) {
  return <Avatar {...props} />;
}

export function Image(props: ImageProps) {
  return <BaseImage {...props} />;
}
