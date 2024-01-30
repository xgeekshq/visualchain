import OpenAI from './OpenAI';
import OpenAICompletion from './OpenAICompletion';
import OpenAIImages from './OpenAIImage';
import End from './End';
import CodeBlock from './Codeblock';
import Start from './Start';
import Explanation from './Explanation';
import CodeTypeSelector from './CodeTypeSelector';
import OpenAITranscription from './OpenAITranscription';
import Display from './Display';
import Tutorial from './Tutorial';

export default {
  openAI: OpenAI,
  openAICompletion: OpenAICompletion,
  openAIImages: OpenAIImages,
  openAITranscription: OpenAITranscription,
  end: End,
  start: Start,
  codeBlock: CodeBlock,
  explanation: Explanation,
  codeLanguage: CodeTypeSelector,
  display: Display,
  tutorial: Tutorial,
};
