import CodeMirror from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';

function CodeEditorTextArea({ language, code, setCode }) {
    return (
        <CodeMirror
            theme={vscodeDarkInit({
                settings: {
                    caret: '#c6c6c6',
                    fontFamily: 'monospace',
                }
            })}
            value={code}
            onChange={(value) => {
                setCode(value);
            }}
            height="400px"
            extensions={[loadLanguage(`${language}`)]}
        />
    );
}
export default CodeEditorTextArea;