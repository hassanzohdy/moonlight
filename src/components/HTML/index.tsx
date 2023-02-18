import styled from "@emotion/styled";

export const Wrapper = styled.div`
  label: HTMLWrapper;

  img {
    max-width: 100%;
  }
`;

export default function HTML({ html }: { html: string | any }) {
  return <Wrapper dangerouslySetInnerHTML={{ __html: html }}></Wrapper>;
}
