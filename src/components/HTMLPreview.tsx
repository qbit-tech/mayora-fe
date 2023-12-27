import React from 'react'

type Props = {
  html: string;
}
export default function HTMLPreview(props: Props) {
  return (
    <div dangerouslySetInnerHTML={{__html: props.html}} />
  )
}