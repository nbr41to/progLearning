import type { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';
import Image from 'next/image';
import type { FC } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import { compileText } from './compileText';

type Props = {
  block: ListBlockChildrenResponse['results'][number];
};

export const NotionBlock: FC<Props> = ({ block }): JSX.Element => {
  if (!('type' in block)) return <></>;

  const { type } = block;

  switch (type) {
    case 'unsupported':
      return <div>[Use unsupported block.]</div>;
    case 'paragraph':
      return <p className="">{compileText(block[type].rich_text)}</p>;
    case 'heading_1':
      return <h1 className="">{compileText(block[type].rich_text)}</h1>;
    case 'heading_2':
      return (
        <h2
          className="my-8 scroll-mt-24 border-b-2 border-gray-800 pb-2 text-xl font-bold"
          id={block.id}
        >
          {compileText(block[type].rich_text)}
        </h2>
      );
    case 'heading_3':
      return <h3 className="">{compileText(block[type].rich_text)}</h3>;
    case 'bulleted_list_item':
      return <li className="">{compileText(block[type].rich_text)}</li>;
    case 'numbered_list_item': // 非対応
      return <li className="">{compileText(block[type].rich_text)}</li>;
    case 'to_do':
      return (
        <li
          className={`${type} ${
            block.type === 'to_do' ? block.to_do.checked.toString() : ''
          }`}
        >
          {compileText(block[type].rich_text)}
        </li>
      );
    case 'quote':
      return <p className="">{compileText(block[type].rich_text)}</p>;
    case 'callout':
      return <p className="">{compileText(block[type].rich_text)}</p>;
    case 'toggle': // childrenを取得ロジックが必要なので未対応
      return <div className="">{compileText(block[type].rich_text)}</div>;
    case 'child_page': // page block 非対応
      return <div className="">ページがここにありますが,表示不可です.</div>;
    case 'bookmark':
      return (
        <a className="" href={block[type].url}>
          {block[type].url}
        </a>
      );
    case 'image':
      const imageBlock = block.image;
      if (imageBlock.type === 'external') {
        return <></>;
      }
      if (imageBlock.type === 'file') {
        return (
          <div className="relative">
            <Image
              src={imageBlock.file.url}
              alt="image in blog"
              layout="fill"
              objectFit="contain"
            />
          </div>
        );
      }
    case 'video':
      /* YouTubeのEmbed type: "external" */
      // console.log(block);
      // console.log(block[type].external.url);
      /* "https://www.youtube.com/embed/hogehoge"に変換する必要あり */
      return (
        // <iframe className='' src={block[type].external.url}></iframe>
        <iframe
          className=""
          src="https://www.youtube.com/embed/8Ok-_r4NIJE"
          width="560"
          height="315"
          title="YouTube video player"
          frameBorder="1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    case 'code':
      const { language } = block[type];

      return (
        <div className="rounded bg-slate-500 p-4">
          {language !== 'plain text' && (
            <div className="mb-1 -mt-2 text-white">{language}</div>
          )}
          <SyntaxHighlighter
            language={block[type].language.toLowerCase()}
            style={monokai}
            customStyle={{
              padding: '12px 16px',
              lineHeight: '28px',
              borderRadius: '4px',
            }}
          >
            {block[type].rich_text.map(({ plain_text }) => plain_text)}
          </SyntaxHighlighter>
        </div>
      );
    default:
      // console.log(block);
      return <p>[未対応Block] type: {block.type}</p>;
  }
};
