import ReactMarkdown from 'react-markdown';

export function MarkdownRenderer({markdown}) {
  return (
    <div>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};